from app.db.database import SessionLocal
from app.db.models import Summary
from app.schemas.summary import SummaryRequest, SummaryResponse

async def save_summary(payload: SummaryRequest) -> SummaryResponse:
    async with SessionLocal() as session:
        summary = Summary(user_id=payload.user_id, content=payload.content)
        session.add(summary)
        await session.commit()
        await session.refresh(summary)
        return SummaryResponse(
            id=summary.id,
            user_id=summary.user_id,
            content=summary.content,
            created_at=str(summary.created_at)
        )
