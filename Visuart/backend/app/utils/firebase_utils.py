import firebase_admin
from firebase_admin import credentials, storage

config = {
    
}

cred = credentials.Certificate("app/utils/serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'sketch2img.appspot.com'
})


def upload_image_to_firebase_storage(user_id, file):
    bucket = storage.bucket()
    blob = bucket.blob(f"profile_photos/{user_id}/{file.filename}")
    blob.upload_from_file(file)
    return blob.public_url


def upload_design_to_firebase_storage(user_id, file_name, file_path):
    bucket = storage.bucket()
    blob = bucket.blob(f"designs/{user_id}/{file_name}")
    blob.upload_from_filename(file_path)
    blob.make_public()
    return blob.public_url

def upload_img_design_to_firebase_storage(user_id, file_name, file_path):
    bucket = storage.bucket()
    blob = bucket.blob(f"img_designs/{user_id}/{file_name}")
    blob.upload_from_filename(file_path)
    blob.make_public()
    return blob.public_url
