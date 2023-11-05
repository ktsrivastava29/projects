from flask import Flask
from app.controllers.auth_controller import auth_blueprint
from app.controllers.dashboard_controller import dashboard_blueprint
from app.repositories.users_repository import UsersRepository
from app.repositories.dashboard_repository import DesignsRepository  # Add this import
from app.constants import MONGO_CLIENT, IMG2KETCH_DB
from flask_cors import CORS

app = Flask(__name__)

# Initialize CORS with your Flask app
CORS(app)

# MongoDB connection setup
users_repository = UsersRepository()
designs_repository = DesignsRepository()  # Create an instance of DesignsRepository

app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(dashboard_blueprint, url_prefix='/dashboard')  # Register the dashboard blueprint

if __name__ == '__main__':
    app.run(debug=True)
