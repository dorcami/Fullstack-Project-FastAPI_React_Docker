from pydantic import BaseModel

class IP(BaseModel):
    domain: str
    internal_ip: str