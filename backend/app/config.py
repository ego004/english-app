from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "English AI API"
    app_env: str = "dev"
    database_url: str = "sqlite:///./english_app.db"
    ollama_base_url: str = "https://api.ollama.com"
    ollama_host: str = "http://localhost:11434"
    ollama_model: str = "llama3"
    ollama_cloud_model: str = ""
    ollama_api_key: str = ""
    ollama_timeout_seconds: int = 90
    jwt_secret: str = "change-me-in-env"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


settings = Settings()
