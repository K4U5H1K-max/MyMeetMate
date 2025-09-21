from fastapi import FastAPI
from app.api.v1.endpoints import analyze, save, export

app = FastAPI(title="Meeting Whisperer API")

app.include_router(analyze.router, prefix="/api/v1/analyze-transcript", tags=["analyze"])
app.include_router(save.router, prefix="/api/v1/save-summary", tags=["save"])
app.include_router(export.router, prefix="/api/v1/export", tags=["export"])
