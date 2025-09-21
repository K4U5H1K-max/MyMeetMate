from pydantic import BaseModel
from typing import Optional

class ExportRequest(BaseModel):
    summary_id: int
    export_type: str  # 'notion', 'slack', 'email'
    destination: Optional[str]

class ExportResponse(BaseModel):
    status: str
    message: Optional[str]
