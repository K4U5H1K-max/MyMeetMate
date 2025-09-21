from fastapi import APIRouter, HTTPException
from app.schemas.export import ExportRequest, ExportResponse
from app.services.export import export_summary

router = APIRouter()

@router.post("/", response_model=ExportResponse)
async def export_summary_endpoint(payload: ExportRequest):
    try:
        return await export_summary(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
