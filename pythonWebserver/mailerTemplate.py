from __future__ import print_function

import os.path
import base64

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from email.message import EmailMessage
import json
# If modifying these scopes, delete the file token.json.
SCOPES = ['https://mail.google.com']

def main(data):
    print(data['email'])
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('./token.json'):
        creds = Credentials.from_authorized_user_file('./token.json', SCOPES)
        print('creds',creds)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        # Call the Gmail API
        service = build('gmail', 'v1', credentials=creds)

        message = EmailMessage()
        message.set_content('This is automated draft mail')
        message['To'] = 'welcometoreality2808@gmail.com'
        message['From'] = 'zenabysscompany@gmail.com'
        message['Subject'] = 'zenabyss.com contact page'
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        message.set_content(
            'Hi, this is automated email'
            'Please look at the content below :)'
            f'contact email: {data["email"]}'
            f'Name: {data["fullname"]}'
            f'phone: {data["phone"]}'
            f'Message: {data["message"]}'
        )
        create_message = {
            'raw': encoded_message
        }

        send_message = (service.users().messages().send(userId="zenabysscompany@gmail.com", body=create_message).execute())
        print(F'Message Id: {send_message["id"]}')
    except HttpError as error:
        print(F'An error occurred: {error}')
        send_message = None
    return send_message

if __name__ == '__main__':
    main()