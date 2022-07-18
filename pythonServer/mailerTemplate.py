from __future__ import print_function
from string import Template
import os.path
import os
import base64
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string_interpolate import interpolate
from logger import logger

def main(data):
   logger("in main ")
   print('in main')
   if (os.path.exists('./credentials/global_variables.json')):
      print('file exists')
      gv = ('./credentials/global_variables.json')
      global_variables = json.load(gv)
      global_variables = global_variables["contact_form_settings"]
      server_ssl = smtplib.SMTP_SSL('smtp.gmail.com', 465)
      logger(str(server_ssl));
      server_ssl.login(global_variables["from_gmail"], global_variables["app_password"])
      logger(str(server_ssl));
      logger("global vars set")
      msg = MIMEMultipart('alternative')
      msg["Subject"] = global_variables["subject"]
      msg["From"] = global_variables["from_gmail"]
      msg["To"] = global_variables["send_email_to"]
      gv.close()
      f = (global_variables["html_file_path"])
      html = f.read()
      html = interpolate(data)
      message = MIMEText(html, 'html')
      msg.attach(message)
      server_ssl.sendmail(global_variables["from_gmail"],global_variables["send_email_to"], msg.as_string())
      server_ssl.close()
      logger("sentmail: True " + "sender:"+str(global_variables["from_gmail"])+ " sentTo:"+str(global_variables["send_email_to"]))
      f.close()
      print('was successful')
      return True
   else:
      print('failed to open file')
      logger("failed line 41")
      return False
