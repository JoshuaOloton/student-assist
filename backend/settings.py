from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent

class Settings(BaseSettings):
    """Class to hold application's config values."""

    MONGO_URI: str
    GEMINI_API_KEY: str
    MONGO_DBNAME: str
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: str
    DB_NAME: str

    # Add this configuration
    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),  # Absolute path to .env
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

settings = Settings()