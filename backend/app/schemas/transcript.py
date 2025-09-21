from pydantic import BaseModel
from typing import List, Optional

class TranscriptRequest(BaseModel):
    transcript: str

class ActionItem(BaseModel):
    description: str
    assignee: Optional[str]

class TranscriptResponse(BaseModel):
    action_items: List[ActionItem]
    decisions: List[str]
    unresolved_questions: List[str]
    sentiment: str
