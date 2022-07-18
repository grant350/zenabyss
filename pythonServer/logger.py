import time
# later make it only accept json objects
def logger(text):
  with open("./python_logs.log", "r+",encoding="utf-8") as f:
    data = f.read()
    if type(text) is str:
       netdata=(((str(time.ctime(time.time()))+": "+text))+'\n')
       f.write(netdata)
    else:
      print('not string can\'t log(file: logger.py, line:7)')
    f.close()
if __name__ == '__logger__':
    logger(None)