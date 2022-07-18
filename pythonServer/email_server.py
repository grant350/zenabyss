

from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
import threading
import time
import json
from logger import logger
from string import Template
import os
import base64
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string_interpolate import interpolate
# gv = open('./credentials/global_variables.json')
# jsonstring = gv.read()
# jsonobj = json.loads(jsonstring)
class MyHandler(BaseHTTPRequestHandler):
    response_body=''
    status=200
    error_body=""
    def do_HEAD(self):
        self.send_response(self.status)
        self.end_headers()
        self.send_header('Content-type','application/json')
        self.send_header('Accept','*')
        logger("Accept:* Content-type: application/json status:200")

    def send_mainresponse(self):
        self.wfile.write(bytes(self.response_body, "utf-8"))
        logger(("status:"+str(self.status)+" responseBody:" +str(self.response_body)))

    def do_GET(self):
        logger(("client_address:" + str(self.client_address)+ " path:" + str(self.path)+" method: GET" ))
        if self.path == '/test':
            self.do_HEAD()
            self.status = 200
            self.response_body = json.dumps({"status":self.status,"date":time.time(),"error":self.error_body})
            self.send_mainresponse()

    def do_POST(self):
        self.do_HEAD()
        logger(("client_address:" + str(self.client_address)+ " path:" + str(self.path)+" method: POST" ))
        if self.path == '/emailserver':
            post_content = self.rfile.read(int(self.headers.get('content-length')));
            logger("postcontents: "+str(post_content) )
            postdata = json.loads(post_content)
            logger("postdata"+str(postdata))
            def sendemail(data):
                logger('data: '+str(data))
                if (os.path.exists('./credentials/global_variables.json')):
                    print('file exists')
                    logger('file exists')
                    gv = open('./credentials/global_variables.json')
                    jsonobj = json.load(gv)
                    print(jsonobj)
                    logger(str(jsonobj))
                    logger(str(jsonobj["contact_form_settings"]["from_gmail"]))
                    global_variables = jsonobj["contact_form_settings"]
                    logger('jsonobj: '+str(global_variables))
                    gv.close()
                    try:
                       server_ssl = smtplib.SMTP_SSL('smtp.gmail.com', 465)
                       logger(str(server_ssl));
                       server_ssl.login(global_variables["from_gmail"], global_variables["app_password"])
                       logger(str(server_ssl));
                       logger("global vars set")
                       msg = MIMEMultipart('alternative')
                       msg["Subject"] = global_variables["subject"]
                       msg["From"] = global_variables["from_gmail"]
                       msg["To"] = global_variables["send_email_to"]

                       f = open (global_variables["html_file_path"])
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
                    except:
                       logger('failed to start google ssl email server')
                else:
                    print('failed to open file')
                    logger("failed line 41")
                    return False
            if (sendemail(postdata)):
               logger("sucess main fn")
               self.status = 200
            else:
                logger("failed main fn")
                self.status = 500
                self.error_body = "response could not go through postdata is empty"
            self.response_body = json.dumps({"status":self.status,"date":time.time(),"error":self.error_body})
            self.send_mainresponse()
        else:
            logger("path is wrong")
            self.send_response(400)

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread. ec2-user-pythonserver-1"""
server = ThreadedHTTPServer(('ec2-user-pythonserver-1', 2400), MyHandler)
def stoppable_http_server(self):
    """ to start and stop server """
    try:
        logger('server starting on port 2400 localhost')

        print('server is starting on port 2400')
        self.serve_forever()
    except KeyboardInterrupt:
        print('Exit server')
        logger('interupt')
        self.server_close()
stoppable_http_server(server)
