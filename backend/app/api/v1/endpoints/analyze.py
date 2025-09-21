from fastapi import APIRouter, HTTPException
from app.schemas.transcript import TranscriptRequest, TranscriptResponse
from app.services.ollama import analyze_transcript

router = APIRouter()

@router.post("/", response_model=TranscriptResponse)
async def analyze_transcript_endpoint(payload: TranscriptRequest):
    try:
        return await analyze_transcript(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
