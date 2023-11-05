import openai
import cv2
import numpy as np
import tempfile

from app.constants import OPEN_AI_SECRET_KEY

# Initialize the OpenAI API client with your API key
openai.api_key = OPEN_AI_SECRET_KEY

#
# def generate_image_from_text(text):
#     try:
#         prompt = f"Generate an image of: {text}"
#
#         # Call the OpenAI API to generate an image based on the prompt
#         response = openai.Image.create(prompt=prompt)
#         image_url = response['url']
#         return image_url
#     except Exception as ex:
#         print(ex)
#         return None

import tensorflow as tf
from tensorflow import keras
from PIL import Image
import numpy as np
from tensorflow_addons.layers import InstanceNormalization
# Load the saved model
monet_generator = keras.models.load_model('/home/kts/Desktop/code/projects/practice/ai/monet_generator_47.h5', compile=False)

# Load and preprocess the input image
input_image_path = '/home/kts/Desktop/code/projects/practice/ai/input_image.jpg'
input_image = Image.open(input_image_path)
input_image = input_image.resize((256, 256))
input_image = np.array(input_image) / 127.5 - 1
input_image = np.expand_dims(input_image, axis=0)

# Generate the output image
output_image = monet_generator.predict(input_image)[0]
output_image = (output_image + 1) * 0.5  # Rescale to [0, 1] range

# Convert the output image to a PIL Image
output_image = (output_image * 255).astype(np.uint8)
output_image = Image.fromarray(output_image)

# Save the output image
output_image_path = 'output_image.jpg'
output_image.save(output_image_path)


def convert_image_to_image(input_image_path):
    # Load the saved model
    monet_generator = keras.models.load_model('/home/kts/Desktop/code/projects/practice/ai/monet_generator_47.h5', compile=False)

    input_image_path = '/home/kts/Desktop/code/projects/practice/ai/input_image.jpg'
    # input_image_path = '/tmp/tmpvj4h1bwr.jpg'
    # Load and preprocess the input image
    input_image = Image.open(input_image_path)
    input_image = input_image.resize((256, 256))
    input_image = np.array(input_image) / 127.5 - 1
    input_image = np.expand_dims(input_image, axis=0)

    # Generate the output image
    output_image = monet_generator.predict(input_image)[0]
    output_image = (output_image + 1) * 0.5  # Rescale to [0, 1] range

    # Convert the output image to a PIL Image
    output_image = (output_image * 255).astype(np.uint8)
    output_image = Image.fromarray(output_image)

    # Save the output image temporarily
    temp_output_image_path = 'temp_output_image.jpg'
    output_image.save(temp_output_image_path)

    return temp_output_image_path

def adjust_brightness_contrast(input_image_path, alpha=1.5, beta=50):
    try:
        # Load the input image
        input_image_path = '/tmp/tmpvj4h1bwr.jpg'
        image = cv2.imread(input_image_path)

        # Apply brightness and contrast adjustment
        image_adjusted = cv2.convertScaleAbs(image, alpha=alpha, beta=beta)

        # Create a temporary file to save the adjusted image
        temp_output_path = tempfile.mktemp(suffix='.jpg')

        # Save the adjusted image
        cv2.imwrite(temp_output_path, image_adjusted)

        return temp_output_path
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None
