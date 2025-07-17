  
import os
from flask_admin import Admin
from .models import db, User, Base, Event, UserMission
from flask_admin.contrib.sqla import ModelView

class UserAdmin(ModelView):
    column_list = ('id', 'name', 'lastname', 'username', 'password', 'image', 'email', 'city', 'country', 'rol', 'is_active')
    
class BaseAdmin(ModelView):
    column_list = ('id', 'user_id', 'base', 'latitude', 'longitude') 
    
class EventAdmin(ModelView):
    column_list = ('id', 'event', 'category', 'start_date', 'end_date', 'moon', 'visibility', 'image')
    
class UserMissionAdmin(ModelView):
    column_list = ('id', 'user_id', 'base_id', 'state', 'image')

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='AstroRadar Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(UserAdmin(User, db.session))
    admin.add_view(BaseAdmin(Base, db.session))
    admin.add_view(EventAdmin(Event, db.session))
    admin.add_view(UserMissionAdmin(UserMission, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))