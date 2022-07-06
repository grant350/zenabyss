
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import simplejson as json
from mailerTemplate import main

class MyHandler(BaseHTTPRequestHandler):
    """this is where business starts"""
    response_body=''
    status=500
    error_body=""
    def do_HEAD(self):
        self.send_response(self.status)
        self.send_header('Accept','application/json')
        self.send_header("Content-type", "application/json")
        self.end_headers()

    def send_mainresponse(self):
        """is a helper method for sending response and writing body"""
        self.send_response(self.status)
        self.wfile.write(bytes(self.response_body, "utf-8"))

    def do_POST(self):
        if self.path == '/emailserver':
            self.do_HEAD()
            try:
                postdata = json.loads(self.rfile.read(int(self.headers.get('content-length'))))
                # print(json.dumps(postdata))
                if main(postdata) is None:
                    self.status = 500
                else:
                    self.status = 200
            except ValueError:
                self.status=500
                self.error_body = "response could not go through postdata is empty"
            # send body json out
            self.response_body = json.dumps({"status":self.status,"date":time.time(),"error":self.error_body})
            self.send_mainresponse()
        else:
            self.send_response(400)

httpd = HTTPServer(("127.0.0.1", 2400), MyHandler)

def stoppable_http_server(self):
    """ to start and stop server """
    try:
        self.serve_forever()
    except KeyboardInterrupt:
        print('Exit server')
        self.server_close()
stoppable_http_server(httpd)
