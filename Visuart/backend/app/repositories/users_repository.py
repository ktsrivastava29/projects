import datetime
import math
import pymongo
from bson import ObjectId
from app.constants import MONGO_CLIENT, IMG2KETCH_DB, USERS


class UsersRepository:
    def __init__(self):
        self.schema = MONGO_CLIENT[IMG2KETCH_DB][USERS]

    def insert(self, data):
        data['created_at'] = datetime.datetime.utcnow()
        data['updated_at'] = datetime.datetime.utcnow()
        return self.schema.insert_one(data)

    def find_one(self, query):
        return self.schema.find_one(query)

    def find_by_email(self, email):
        return self.schema.find_one({'email': email})

    def update_profile_photo(self, user_id, profile_photo_url):
        query = {'_id': ObjectId(user_id)}
        update_data = {
            '$set': {
                'profile_photo': profile_photo_url,
                'updated_at': datetime.datetime.utcnow()
            }
        }
        self.schema.update_one(query, update_data)

    def update_password(self, user_id, password):
        query = {'_id': ObjectId(user_id)}
        update_data = {
            '$set': {
                'password': password,
                'updated_at': datetime.datetime.utcnow()
            }
        }
        self.schema.update_one(query, update_data)

    def update_link(self, user_id, new_link):
        query = {'_id': ObjectId(user_id)}
        update_data = {
            '$set': {
                'link': new_link,
                'updated_at': datetime.datetime.utcnow()
            }
        }
        self.schema.update_one(query, update_data)

    def update_img(self, user_id, img_link):
        query = {'_id': ObjectId(user_id)}
        update_data = {
            '$set': {
                'profile_photo': img_link,
                'updated_at': datetime.datetime.utcnow()
            }
        }
        self.schema.update_one(query, update_data)

    def update_verification_status(self, user_id, verified):
        query = {'_id': ObjectId(user_id)}
        update_data = {
            '$set': {
                'verified': verified,
                'updated_at': datetime.datetime.utcnow()
            }
        }
        self.schema.update_one(query, update_data)