from fastapi import APIRouter, HTTPException
from app.schemas.summary import SummaryRequest, SummaryResponse
from app.services.summary import save_summary

router = APIRouter()

@router.post("/", response_model=SummaryResponse)
async def save_summary_endpoint(payload: SummaryRequest):
    try:
        return await save_summary(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
