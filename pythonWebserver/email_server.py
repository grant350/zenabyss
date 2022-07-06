import socketserver
from http.server import BaseHTTPRequestHandler, HTTPServer
import simplejson as json
import time
from mailerTemplate import main
# print(main('my data'))
class MyHandler(BaseHTTPRequestHandler):
    responseBody=''
    status=500
    errorBody=""
    def do_HEAD(self):
        self.send_response(self.status)
        self.send_header('Accept','application/json')
        self.send_header("Content-type", "application/json")
        self.end_headers()

    def sendResponse(self):
        self.send_response(self.status)
        self.wfile.write(bytes(self.responseBody, "utf-8"))

    def do_POST(self):
        if self.path == '/emailserver':
            self.do_HEAD()
            try:
                postdata = json.loads(self.rfile.read(int(self.headers.get('content-length'))))
                # print(json.dumps(postdata))
                if (main(postdata) == None):
                    self.status = 500
                else:
                    self.status = 200
            except:
                self.status=500
                self.errorBody = "response could not go through postdata is empty"
            # send body json out
            self.responseBody = json.dumps({"status":self.status,"date":time.time(),"error":self.errorBody})
            self.sendResponse()
        else:
            self.send_response(400)

httpd = HTTPServer(("127.0.0.1", 2400), MyHandler)

def StoppableHTTPServer(self):
    try:
        self.serve_forever()
    except KeyboardInterrupt:
        print('Exit server')
        # self.server_close()
        pass
    except Error:
        pass
    finally:
        # Clean-up server (close socket, etc.)
        self.server_close()
StoppableHTTPServer(httpd)