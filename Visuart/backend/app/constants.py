import os
from pymongo import MongoClient

SECRET_KEY = ''
DB_URL = 'mongodb://localhost:27017/sketch2img'
OPEN_AI_SECRET_KEY = ''

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

MONGO_CLIENT = MongoClient(DB_URL)


SMTP_PASSWORD = ''
SMTP_USERNAME = ''
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = '

IMG2KETCH_DB = ''
USERS = 'users'
DESIGNS = 'designs'
