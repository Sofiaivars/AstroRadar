"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os, hashlib
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from api.utils import APIException, generate_sitemap
from api.models import db, User, Event, UserMission, Base
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
from ai_service.cosmo_functions import cosmo_tip
from ai_service.coodenadas_ai import ask_ai
from datetime import datetime

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

CORS(app, supports_credentials=True,)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

#JWT
app.config["JWT_SECRET_KEY"] = "contraseñamegaultrahipersecretaindescifrable12345"
jwt = JWTManager(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@jwt.unauthorized_loader
def unauthorized_response(callback):
    print(f"Unauthorized: {callback}")
    return jsonify({"msg": "Token no enviado o inválido"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(reason):
    print(f"Token inválido: {reason}")
    return jsonify({"msg": "Token inválido"}), 422

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    print("Token expirado")
    return jsonify({"msg": "Token expirado"}), 401

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

#Crear Token
@app.route('/login', methods=['POST'])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(username=username).first()
    
    if user is None:
        return jsonify({"msg": "Usuario o contraseña incorrectos."}), 401
    
    hashed_password = user.password
    if hashlib.sha256(password.encode('utf-8')).hexdigest() == hashed_password:
        access_token = create_access_token(identity=str(user.id))
        return jsonify({ "token": access_token, "user_id": user.id })
    
    return jsonify({"message": "Invalid password"}), 401

# Ruta protegida
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({ 
                    "id": user.id, 
                    "username": user.username, 
                    "name": user.name, 
                    "lastname": user.lastname,
                    "email": user.email,
                    "city": user.city,
                    "country": user.country,
                    }), 200

# signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get("username")
    name = data.get("name")
    lastname = data.get("lastname")
    email = data.get("email")
    city = data.get("city")
    country = data.get("country")
    password = data.get("password")
    image = data.get("image")
    rol = "user"
    if not username or not password:
        return jsonify({ "msg": "Faltan campos obligatorios." }), 400
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({ "msg": "El usuario ya existe." }), 409
    
    hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
    
    new_user = User(username=username, password=hashed_password, name=name, lastname=lastname, email=email, city=city, country=country, image=image, rol=rol, is_active=False,)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"usename": username, "email": email}), 200

@app.route('/users', methods=['GET'])
def get_users_from_db():
    users = User.query.all()
    if not users:
        return jsonify({"msg": "No hay datos de usuario."}), 200
    return jsonify([user.serialize() for user in users]), 200

# Cosmo dashboard AI endpoint
@app.route('/cosmotip', methods=['GET'])
def get_response_from_ai():
    response = cosmo_tip()
    if response:
        print(response)
        return jsonify(response), 200
    else:
        return jsonify({"message": "Sin respuesta..."})


@app.route('/getjson', methods=['POST'])
def get_coodenates_from_ai():
    data = request.get_json()
    lat = data.get("latitude")
    lon = data.get("longitude")

    if lat is None or lon is None:
        return jsonify({"error": "Faltan coordenadas"}), 400

    prompt = f"""
            Dame 3 lugares para observar eventos astronómicos a menos de 50km de esta ubicación: latitud {lat}, longitud {lon}. 
            Devuelve solo un JSON con el siguiente formato:

            {{
            "spots": [
                {{
                "name": "Nombre del lugar",
                "location": "Ciudad o País",
                "coordinates": {{
                    "latitude": ...,
                    "longitude": ...
                }}
                }}
            ]
            }}

            No agregues texto fuera del JSON."""

    response = ask_ai(prompt)
    try:
        return jsonify(eval(response))  # Usa eval solo si confías en la estructura
    except Exception as e:
        return jsonify({"error": "Error al procesar la respuesta de la IA", "raw": response}), 500
    
# EVENTS 
@app.route('/events/', methods=['GET'])
def get_events():
    events = Event.query.all()
    if not events:
        return jsonify({"msg": "No se han encontrado eventos."}), 404
    return jsonify([event.serialize() for event in events]), 200

# MISSIONS BY USER WIP!!!
@app.route('/usermissions/<int:user_id>', methods=['GET'])
def get_missions_by_id(user_id):
    statement = (
        select(UserMission)
        .options(
            selectinload(UserMission.missions_base),
            selectinload(UserMission.missions_event)
        ).where(UserMission.user_id == user_id)
    )
    missions = db.session.execute(statement).scalars().all()
    if not missions:
        return jsonify({"msg": "El usuario no tiene misiones guardadas."}), 404
    return jsonify([mission.serialize() for mission in missions]), 200

# ENDPOINT TEMPORAL PARA GUARDAR EVENTOS
@app.route('/saveevents', methods=['POST'])
def save_events_to_db():
    data = request.get_json()
    
    if not data:
        return jsonify({"msg": "Sin error al obtener datos de la petición."}), 400
    
    event = data.get("evento")
    start_date = datetime.strptime(data.get("fecha_inicio"), "%Y-%m-%d").date()
    end_date = datetime.strptime(data.get("fecha_fin"), "%Y-%m-%d").date()
    category = data.get("tipo")
    visibility = data.get("visibilidad")
    moon = data.get("fase_lunar")
    
    if category == "lluvia de meteoros":
        image = "https://images.theconversation.com/files/564819/original/file-20231211-25-v7fc5g.jpg?ixlib=rb-4.1.0&rect=207%2C145%2C4684%2C2729&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
    elif category == "eclipse lunar":
        image = "https://static.nationalgeographic.es/files/styles/image_3200/public/4931.600x450.jpg?w=1900&h=1425"
    elif category == "eclipse solar":
        image = "https://content.nationalgeographic.com.es/medio/2025/06/25/eclipse-solar-marzo_0195214f_250625113231_800x800.webp"
    elif category == "evento planetario":
        image = "https://phantom-marca-mx.unidadeditorial.es/cae3f4d74008c3912e5cd8c85787a18e/resize/828/f/jpg/mx/assets/multimedia/imagenes/2025/01/21/17374997597311.jpg"
    else:
        image = "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
    
    new_event = Event(event=event, category=category, start_date=start_date, end_date=end_date, moon=moon, visibility=visibility, image=image)
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"event": event}), 200
    

@app.route('/base', methods=['POST'])
@jwt_required()
def create_base():
    user_id = get_jwt_identity()  # ID del usuario desde el token JWT

    data = request.get_json()

    # Validaciones básicas
    base_name = data.get("base")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    if not base_name or not latitude or not longitude:
        return jsonify({"msg": "Faltan datos obligatorios"}), 400

    # Crear nueva base
    new_base = Base(
        user_id=user_id,
        base=base_name,
        latitude=latitude,
        longitude=longitude
    )

    try:
        db.session.add(new_base)
        db.session.commit()
        return jsonify({
            "msg": "Base creada correctamente",
            "base": new_base.serialize()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al guardar la base", "error": str(e)}), 500


@app.route('/getbases', methods=['GET'])
@jwt_required()
def get_user_bases():
    user_id = get_jwt_identity()
    
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    bases = Base.query.filter_by(user_id=user.id).all()
    return jsonify({"bases": [b.serialize() for b in bases]}), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
