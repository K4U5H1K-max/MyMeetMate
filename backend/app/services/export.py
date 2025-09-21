from app.schemas.export import ExportRequest, ExportResponse

async def export_summary(payload: ExportRequest) -> ExportResponse:
    # TODO: Implement export logic for Notion, Slack, Email
    return ExportResponse(status="success", message="Exported successfully (stub)")
