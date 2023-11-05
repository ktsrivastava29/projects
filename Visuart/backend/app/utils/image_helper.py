import datetime
import os
import requests
from tempfile import NamedTemporaryFile

from app.controllers.auth_controller import get_current_user_id
from app.utils.firebase_utils import upload_design_to_firebase_storage, upload_img_design_to_firebase_storage
from app.utils.openai_helper import convert_image_to_image, adjust_brightness_contrast


def generate_image_from_text(text, user_id):
    try:
        # Generate image using DeepAI API
        # response = requests.post(
        #     "https://api.deepai.org/api/text2img",
        #     data={'text': text},
        #     headers={'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K'}
        # )
        # response_json = response.json()
        # print(response_json)
        # output_url = response_json['output_url']

        output_url = 'https://storage.googleapis.com/sketch2img.appspot.com/designs/64ebae90367d71935a677e7a/generated_image_2023-10-04%2005%3A09%3A57.505431.jpg'
        print(output_url, user_id)
        # Download image and save it to a temporary file
        image_response = requests.get(output_url)
        with NamedTemporaryFile(delete=False, suffix='.jpg') as temp_image:
            temp_image.write(image_response.content)
            temp_image_path = temp_image.name

        # Upload image to Firebase Storage and get the public URL
        file_name = f'generated_image_{datetime.datetime.utcnow()}.jpg'  # Adjust the file name
        image_url = upload_design_to_firebase_storage(user_id, file_name, temp_image_path)

        # Remove the temporary image file
        os.remove(temp_image_path)

        return image_url

    except Exception as ex:
        print(ex)
        return None


def generate_image_from_img(input_image_path, user_id):
    try:
        print(input_image_path, 'input_image_path')
        # Call the convert_image_to_image function to get the temporary output image path
        temp_output_image_path = convert_image_to_image(input_image_path)
        print('temp_output_image_path', temp_output_image_path)
        # Upload the temporary output image to Firebase Storage and get the public URL
        file_name = f'generated_image_{datetime.datetime.utcnow()}.jpg'  # Adjust the file name
        image_url = upload_img_design_to_firebase_storage(user_id, file_name, temp_output_image_path)

        # Remove the temporary output image file
        os.remove(temp_output_image_path)

        return image_url

    except Exception as ex:
        print(ex)
        return None

def sharp_image_from_img(input_image_path, user_id):
    try:
        print(input_image_path, 'input_image_path')
        # Call the convert_image_to_image function to get the temporary output image path
        temp_output_image_path = adjust_brightness_contrast(input_image_path)
        print('temp_output_image_path', temp_output_image_path)
        # Upload the temporary output image to Firebase Storage and get the public URL
        file_name = f'generated_image_{datetime.datetime.utcnow()}.jpg'  # Adjust the file name
        image_url = upload_img_design_to_firebase_storage(user_id, file_name, temp_output_image_path)

        # Remove the temporary output image file
        os.remove(temp_output_image_path)

        return image_url

    except Exception as ex:
        print(ex)
        return None


if __name__ == '__main__':
    print(generate_image_from_img(input_image_path='/home/kts/Desktop/code/projects/practice/ai/input_image.jpg', user_id='64cd22786788cc7aa9a32735'))
# user_id = '64cd22786788cc7aa9a32735'
# image_response = requests.get('https://api.deepai.org/job-view-file/4dc6cb0c-3603-4d8d-8fc7-032274993860/outputs/output.jpg')
# with NamedTemporaryFile(delete=False, suffix='.jpg') as temp_image:
#     temp_image.write(image_response.content)
#     temp_image_path = temp_image.name
#
# # Upload image to Firebase Storage and get the public URL
# file_name = f'generated_image_{user_id}.jpg'  # Adjust the file name
# image_url = uplo ad_design_to_firebase_storage(user_id, file_name, temp_image_path)
