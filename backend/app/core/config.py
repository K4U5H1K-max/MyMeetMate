import os

class Settings:
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecret")
    DB_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./meeting_whisperer.db")
    OLLAMA_URL: str = os.getenv("OLLAMA_URL", "http://localhost:11434")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

settings = Settings()
