from flask import Blueprint, request, jsonify

import jwt
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.constants import SECRET_KEY, SMTP_USERNAME, SMTP_SERVER, SMTP_PASSWORD, SMTP_PORT
from app.repositories.users_repository import UsersRepository
from app.utils.common import generate_verification_code, send_verification_code_to_email
from bson import ObjectId

auth_blueprint = Blueprint('auth', __name__)
users_repository = UsersRepository()


# @auth_blueprint.route('/register', methods=['POST'])
# def register():
#     data = request.json
#
#     # Check if the user already exists
#     if users_repository.find_by_email(data['email']):
#         return jsonify({'message': 'User with this email already exists'}), 400
#
#     users_repository.insert(data)
#     return jsonify({'message': 'User registered successfully'}), 201
@auth_blueprint.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')

        # Check if the user already exists
        if users_repository.find_by_email(email):
            return jsonify({'message': 'User with this email already exists'}), 400

        # Perform email verification here
        verification_code = generate_verification_code()

        # Save the verification code and user data in the database
        user_data = {
            'email': email,
            'password': data['password'],  # Make sure to hash the password before saving it
            'verification_code': verification_code,
            'verified': False  # Set to True once the user is verified
        }
        users_repository.insert(user_data)

        # Send the verification code to the user's email
        send_verification_code_to_email(email, verification_code)

        return jsonify({'message': 'User registered successfully. Please check your email for verification.'}), 201

    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error registering user'}), 500


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    user = users_repository.find_by_email(data['email'])

    if user and user['password'] == data['password']:
        token = jwt.encode(
            {'user_id': str(user['_id']), 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)}, SECRET_KEY,
            algorithm='HS256')
        return jsonify({'token': token})

    return jsonify({'message': 'Invalid credentials'}), 401


@auth_blueprint.route('/get_user_data', methods=['GET'])
def get_user_data():
    user_id = get_current_user_id()
    print(user_id)  # Get the current user's ID

    # Assuming you have a 'users_repository' that's a reference to your data repository
    user_data = users_repository.find_one({'_id': ObjectId(user_id)})

    if user_data:
        print(user_data)
        # User data found, return it as JSON
        user_data['_id'] = str(user_data['_id'])
        return jsonify(user_data), 200
    else:
        # User data not found, return an appropriate response (e.g., 404 Not Found)
        return jsonify({'error': 'User not found'}), 404

@auth_blueprint.route('/get_current_user_id', methods=['GET'])
def get_current_user_id():
    auth_header = request.headers.get('Authorization')

    if auth_header:
        token = auth_header.split()[1]
        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = str(decoded_token['user_id'])
            return user_id  # Return just the user ID as a string
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

    return jsonify({'message': 'Authorization header not found'}), 401


@auth_blueprint.route('/verify_email', methods=['GET'])
def verify_email():
    try:
        verification_token = request.args.get('token')

        try:
            # Decode the JWT token with the SECRET_KEY
            token_payload = jwt.decode(verification_token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Verification link has expired'}), 400
        except jwt.DecodeError:
            return jsonify({'message': 'Invalid verification token'}), 400

        email = token_payload.get('email')
        verification_code = token_payload.get('verification_code')

        # Find the user using the email and verification code
        query = {'email': email, 'verification_code': verification_code}
        user = users_repository.find_one(query)

        if user:
            # Update user's verified field to True
            users_repository.update_verification_status(user['_id'], verified=True)
            return jsonify({'message': 'Email verified successfully'}), 200
        else:
            return jsonify({'message': 'Invalid verification code'}), 400

    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error verifying email'}), 500


@auth_blueprint.route('/forgot_password', methods=['POST'])
def forgot_password():
    try:
        data = request.json
        user = users_repository.find_by_email(data['email'])
        print(user)
        if user:
            # Generate a reset token with a short expiration time (e.g., 1 hour)
            reset_token = jwt.encode(
                {'user_id': str(user['_id']), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                SECRET_KEY, algorithm='HS256')
            print(reset_token)
            # Create a reset password link with the token
            reset_link = f'http://127.0.0.1:5000/auth/reset_password?token={reset_token}'

            # Send the reset link to the user's email
            subject = 'Password Reset'
            message = f'Click the following link to reset your password: {reset_link}'

            msg = MIMEMultipart()
            msg['From'] = SMTP_USERNAME
            msg['To'] = data['email']
            msg['Subject'] = subject
            msg.attach(MIMEText(message, 'plain'))

            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, data['email'], msg.as_string())
            server.quit()

            return jsonify({'message': 'Password reset link sent to your email'}), 200
        else:
            return jsonify({'message': 'Email not found'}), 404

    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error sending reset link'}), 500


@auth_blueprint.route('/reset_password', methods=['POST'])
def reset_password():
    try:
        reset_token = request.args.get('token')  # Get the token from the query parameter
        new_password = request.json.get('new_password')

        if reset_token and new_password:
            try:
                # Decode and verify the reset token
                decoded_token = jwt.decode(reset_token, SECRET_KEY, algorithms=['HS256'])

                # Get the user ID from the decoded token
                user_id = decoded_token.get('user_id')

                # Update the user's password using the new_password
                users_repository.update_password(user_id, new_password)

                return jsonify({'message': 'Password reset successful'}), 200

            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token has expired'}), 400
            except jwt.DecodeError:
                return jsonify({'message': 'Invalid token'}), 400

        return jsonify({'message': 'Invalid data'}), 400

    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error resetting password'}), 500

@auth_blueprint.route('/update_profile', methods=['POST'])
def update_profile():
    try:
        user_id = get_current_user_id()
        print(user_id)  # Get the current user's ID

        # Assuming you have a 'users_repository' that's a reference to your data repository
        user_data = users_repository.find_one({'_id': ObjectId(user_id)})  # Implement a function to get the user's email

        if not user_id:
            return jsonify({'message': 'User not found'}), 404

        # Process the request data
        # if 'image' in request.files:
        #     # Handle the user's profile image
        #     uploaded_image = request.files['image']
        #     # Save the uploaded image and get the image URL
        #     image_url = save_uploaded_image(uploaded_image, user_email)
        #
        #     # Update the user's profile image URL in the database
        #     users_repository.update_profile_image(user['_id'], image_url)

        if 'newPassword' in request.json:
            # Update the user's password
            new_password = request.json['newPassword']
            # Hash the new password (ensure you have a secure password hashing method)
            # hashed_password = hash_password(new_password
            # Update the user's password in the database
            users_repository.update_password(user_id, new_password)

        if 'profileLink' in request.json:
            # Update the user's link
            new_link = request.json['profileLink']
            # Update the user's link in the database
            users_repository.update_link(user_id, new_link)

        if 'img_link' in request.json:
            # Update the user's link
            img_link = request.json['img_link']
            # Update the user's link in the database
            users_repository.update_img(user_id, img_link)

        return jsonify({'message': 'Profile updated successfully'}), 200

    except Exception as ex:
        print(ex)
        return jsonify({'message': 'Error updating profile'}), 500
