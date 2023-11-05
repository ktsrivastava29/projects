import datetime
import os
from tempfile import NamedTemporaryFile

from flask import Blueprint, request, jsonify

from app.controllers.auth_controller import get_current_user_id
from app.repositories.dashboard_repository import DesignsRepository  # Import DesignsRepository
from app.repositories.users_repository import UsersRepository
from app.utils.common import allowed_file
from app.utils.firebase_utils import upload_image_to_firebase_storage
from app.utils.image_helper import generate_image_from_text, generate_image_from_img, sharp_image_from_img

dashboard_blueprint = Blueprint('dashboard', __name__)
designs_repository = DesignsRepository()  # Create an instance of DesignsRepository
users_repository = UsersRepository()

created_at = datetime.datetime.utcnow()


@dashboard_blueprint.route('/upload_design', methods=['POST'])
def upload_design():
    try:
        user_id = get_current_user_id()  # Get the current user's ID

        # Check if the 'file' and 'caption' fields are in the request form-data
        if 'file' not in request.files:
            return jsonify({'message': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        design_url = upload_image_to_firebase_storage(user_id, file)

        # Get the 'caption' field from the request form-data
        caption = request.form.get('caption', '')

        design_data = {
            'user_id': user_id,
            'image': design_url,
            'caption': caption,
            'created_at': created_at
        }

        designs_repository.insert(design_data)
        return jsonify({'message': 'Design uploaded successfully'}), 201
    except Exception as ex:
        print(ex)


# @dashboard_blueprint.route('/update_profile_photo', methods=['POST'])
# def update_profile_photo():
#     try:
#         user_id = get_current_user_id()  # Get the current user's ID
#
#         data = request.json
#         profile_photo_url = data.get('profile_photo_url', '')
#
#         users_repository.update_profile_photo(user_id, profile_photo_url)
#
#         return jsonify({'message': 'Profile photo updated successfully'}), 200
#     except Exception as ex:
#         print(ex)

@dashboard_blueprint.route('/textToImg', methods=['POST'])
def text_to_image():
    try:
        text = request.json.get('text', '')  # Get text from the request
        user_id = get_current_user_id()
        print(text)
        image_url = generate_image_from_text(text, user_id)
        print(image_url)
        if image_url:
            design_data = {
                'user_id': user_id,
                'image': image_url,
                'created_at': created_at
            }

            designs_repository.insert(design_data)
            return jsonify({'image_url': image_url}), 200
        else:
            return jsonify({'message': 'Error generating image'}), 500
    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error generating image'}), 500

@dashboard_blueprint.route('/imgToImg', methods=['POST'])
def img_to_image():
    try:
        # Get the user ID
        user_id = get_current_user_id()

        # Get the uploaded image file from the request
        uploaded_file = request.files['image']

        if uploaded_file and allowed_file(uploaded_file.filename):
            # Save the uploaded image to a temporary file
            with NamedTemporaryFile(delete=False, suffix='.jpg') as temp_image:
                uploaded_file.save(temp_image)
                temp_image_path = temp_image.name
                print(temp_image_path, "temp image path")
                # Call the generate_image_from_img function to generate and upload the image
                image_url = generate_image_from_img(temp_image_path, user_id)
                print(image_url, 'image urllll')
                # Remove the temporary image file
                os.remove(temp_image_path)

                if image_url:
                    design_data = {
                        'user_id': user_id,
                        'image': image_url,
                        'type': 'from_img',
                        'created_at': datetime.datetime.utcnow()
                    }

                    designs_repository.insert(design_data)
                    return jsonify({'image_url': image_url}), 200
                else:
                    return jsonify({'message': 'Error generating image'}), 500
        else:
            return jsonify({'message': 'Invalid or missing image file'}), 400

    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error generating image'}), 500


@dashboard_blueprint.route('/imgToSharp', methods=['POST'])
def img_to_sharp():
    try:
        # Get the user ID
        user_id = get_current_user_id()

        # Get the uploaded image file from the request
        uploaded_file = request.files['image']

        if uploaded_file and allowed_file(uploaded_file.filename):
            # Save the uploaded image to a temporary file
            with NamedTemporaryFile(delete=False, suffix='.jpg') as temp_image:
                uploaded_file.save(temp_image)
                temp_image_path = temp_image.name
                print(temp_image_path, "temp image path")
                # Call the generate_image_from_img function to generate and upload the image
                image_url = sharp_image_from_img(temp_image_path, user_id)
                print(image_url, 'image urllll')
                # Remove the temporary image file
                os.remove(temp_image_path)

                if image_url:
                    design_data = {
                        'user_id': user_id,
                        'image': image_url,
                        'type': 'from_img_to_sharp',
                        'created_at': datetime.datetime.utcnow()
                    }

                    designs_repository.insert(design_data)
                    return jsonify({'image_url': image_url}), 200
                else:
                    return jsonify({'message': 'Error generating image'}), 500
        else:
            return jsonify({'message': 'Invalid or missing image file'}), 400

    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error generating image'}), 500


@dashboard_blueprint.route('/upload_profile_photo', methods=['POST'])
def upload_profile_photo():
    try:
        user_id = get_current_user_id()  # Get the current user's ID

        if 'file' not in request.files:
            return jsonify({'message': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        # Upload the image to Firebase Storage and get the URL
        photo_url = upload_image_to_firebase_storage(user_id, file)

        # Update the profile photo URL in the users table
        users_repository.update_profile_photo(user_id, photo_url)

        return jsonify({'message': 'Profile photo uploaded successfully'}), 200
    except Exception as ex:
        print(ex)


@dashboard_blueprint.route('/get_user_designs', methods=['GET'])
def get_user_designs():
    user_id = get_current_user_id()
    print(user_id)  # Get the current user's ID
    user_designs = designs_repository.find_by_user(user_id)

    return jsonify(user_designs), 200
