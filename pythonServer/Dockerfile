FROM python:3.9.12
WORKDIR /zenabyss
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .
CMD ["python3","email_server.py"]
