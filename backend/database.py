# Imports
from model import IP
import socket
# MongoDB driver
import motor.motor_asyncio

# Database declaration
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb:27017')
database = client.Aisap
collection = database.ips


# #################################
# Function declarations for interacting with the API

# Get all the database docs
async def fetch_all_ips():
    ips_list = []
    cursor = collection.find({})
    async for doc in cursor:
        ips_list.append(IP(**doc))
    return ips_list

# Create a doc in the database for the required domain
async def create_ip(ip):
    doc = ip
    internal_ip = socket.gethostbyname(doc["domain"])
    doc["internal_ip"] = internal_ip
    await collection.insert_one(doc)
    return doc

# Create a doc in the database for the required domain
async def create_ip_v2(ip):
    doc = {"domain": ip}
    internal_ip = socket.gethostbyname(doc["domain"])
    doc["internal_ip"] = internal_ip
    await collection.insert_one(doc)
    return doc

# Delete a doc from the database (using the domain name)
async def remove_ip(domain):
    exists = await collection.find_one({"domain": domain})
    if exists:
        await collection.delete_many({"domain":domain})
        return True