import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.constants import ALLOWED_EXTENSIONS, SECRET_KEY, SMTP_USERNAME, SMTP_SERVER, SMTP_PORT, SMTP_PASSWORD

import random
import string
import jwt

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def generate_verification_code():
    # Generate a random 6-digit alphanumeric code
    code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    return code

def send_verification_code_to_email(email, verification_code):
    try:
        # Create a JWT token with the email and verification code
        token_payload = {
            'email': email,
            'verification_code': verification_code
        }
        verification_token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')

        # Send the verification token link to the user's email
        verification_link = f'http://127.0.0.1:5000/auth/verify_email?token={verification_token}'
        subject = 'Email Verification'
        message = f'Click the following link to verify your email: {verification_link}'

        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, email, msg.as_string())
        server.quit()

        return True

    except Exception as ex:
        print(ex)
        return False