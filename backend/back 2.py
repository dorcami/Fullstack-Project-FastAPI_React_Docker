# Imports
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import IP
import socket
from requests import get

# Api object creation
app = FastAPI()

# Database functions import (defined in database.py)
from database import (
    fetch_all_ips,
    create_ip,
    remove_ip,
    create_ip_v2,
)

# A layer for authorizing the react client to make requests
origins = ['http://localhost:3000']
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


# REST methods
# #################################

# A simple home request for sanity purposes
@app.get("/")
def home():
    return {"loading": "successful"}

# Get all the database docs
@app.get("/api/ips")
async def get_ips():
    resp = await fetch_all_ips()
    return resp

# Get the host's local and public ip (database independent)
@app.get("/api/host")
async def get_host():
    local = socket.gethostbyname(socket.gethostname())
    public = get('https://api.ipify.org').text
    resp = {"local_ip": local, "public_ip": public}
    return resp

# Create a doc in the database for the required domain
# Version 1 with a general endpoint + data in a json
@app.post("/api/ips/", response_model=IP)
async def post_ip(ip: IP):
    resp = await create_ip(ip.dict())
    resp = IP(**resp)
    if resp:
        return resp
    raise HTTPException(400, "Something went wrong")

# Create a doc in the database for the required domain
# Version 2 with a full endpoint
@app.post("/api/ips/{url}", response_model=IP)
async def post_ip(url):
    resp = await create_ip_v2(url)
    resp = IP(**resp)
    if resp:
        return resp
    raise HTTPException(400, "The provided domain was not found")
    
# Delete a doc from the database (using the domain name)
@app.delete("/api/ips/{domain}")
async def delete_ip(domain):
    resp = await remove_ip(domain)
    if resp:
        return "Successfully deleted selected domain"
    raise HTTPException(404, "There is no data for this domain")
