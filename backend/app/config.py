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
    cors_allowed_origins: str = "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001"
    cors_allowed_origin_regex: str = r"https://.*\\.vercel\\.app"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_allowed_origins.split(",") if origin.strip()]


settings = Settings()
