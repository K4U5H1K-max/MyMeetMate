from pydantic import BaseModel
from typing import Optional

class SummaryRequest(BaseModel):
    user_id: int
    content: str

class SummaryResponse(BaseModel):
    id: int
    user_id: int
    content: str
    created_at: str
