import datetime

from pymongo import MongoClient
from bson import ObjectId
from app.constants import MONGO_CLIENT, IMG2KETCH_DB, DESIGNS


class DesignsRepository:
    def __init__(self):
        self.schema = MONGO_CLIENT[IMG2KETCH_DB][DESIGNS]

    def insert(self, data):
        data['created_at'] = datetime.datetime.utcnow()
        data['updated_at'] = datetime.datetime.utcnow()
        return self.schema.insert_one(data)

    def find_by_user(self, user_id):
        designs = list(self.schema.find({'user_id': user_id}))

        # Convert ObjectId to string for each design
        for design in designs:
            design['_id'] = str(design['_id'])

        return designs

