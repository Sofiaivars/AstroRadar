"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, UserMission
from sqlalchemy import select
from sqlalchemy.orm import selectinload

umissions = Blueprint('umissions', __name__)

# Allow CORS requests to this API
CORS(umissions)

# MISSIONS BY USER
@umissions.route('/usermissions/<int:user_id>', methods=['GET'])
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

#ADD USER MISSION
@umissions.route('/add-user-mission', methods=['POST'])
def add_user_mission():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Error al obtener datos de la petición."}), 400
    
    user_id = data.get("user_id")
    event_id = data.get("event_id")
    state = data.get("state")
    if not user_id or not event_id or not state:
        return jsonify({"msg": "Faltan datos obligatorios"}), 400
    
    mission_exists = UserMission.query.filter_by(event_id=event_id).first()
    if mission_exists is not None:
        return jsonify({"msg": f"La misión con id {event_id} ya existe."}), 400
    
    new_user_mission = UserMission(user_id=user_id, base_id=None, event_id=event_id, state=state, image="")
    db.session.add(new_user_mission)
    db.session.commit()
    return jsonify({"user_id": user_id, "event_id": event_id, "state": state}), 200

# ACTUALIZAR CAMPO STATE DE USERMISSION
@umissions.route('/update_mission_state/<int:mission_id>', methods=['PUT'])
def update_mission_state(mission_id):
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Sin error al obtener datos de la petición."}), 400
    
    new_state = data.get('state')
    
    mission = UserMission.query.get(mission_id)
    if not mission:
        return jsonify({"error": "Mission not found!"}), 404
    
    mission.state = new_state
    db.session.commit()
    
    return jsonify(mission.serialize()), 200

# BORRAR USER MISSION
@umissions.route('/delete-mission/<int:mission_id>', methods=['DELETE'])
def delete_mission(mission_id):
    mission = UserMission.query.get(mission_id)
    
    if not mission:
        return jsonify({"error": "Misión no encontrada"}), 404
    
    db.session.delete(mission)
    db.session.commit()
    
    return jsonify({"message": f'Misión {mission_id} eliminada correctamente.'}), 200

# ACTUALIZAR BASE ESTELAR DE LA MISIÓN 
@umissions.route('/update-base/<int:mission_id>', methods=['PUT'])
def update_base(mission_id):
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Error al obtener datos de la petición."}), 400
    
    new_base_id = data.get('base_id')
    mission = UserMission.query.get(mission_id)
    
    if not mission:
        return jsonify({"error": "Misión no encontrada"}), 404
    
    mission.base_id = new_base_id
    db.session.commit()
    return jsonify(mission.serialize()), 200

# ACTUALIZAR IMAGEN DE MISIÓN
@umissions.route('/update-mission-image/<int:mission_id>', methods=['PUT'])
def update_image(mission_id):
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Sin datos en la petición."})
    
    new_image = data.get('image_src')
    mission = UserMission.query.get(mission_id)
    
    if not mission:
        return jsonify({"error": "Misión no encontrada."})
    
    mission.image = new_image
    mission.state = "done"
    db.session.commit()
    return jsonify(mission.serialize()), 200