from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from settings import settings


DB_USER = settings.DB_USER
DB_PASSWORD = settings.DB_PASSWORD
DB_HOST = settings.DB_HOST
DB_PORT = settings.DB_PORT
DB_NAME = settings.DB_NAME

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(
    DATABASE_URL,
    echo=True,  # Enable SQL query logging
    pool_pre_ping=True,  # Enable connection pool pre-ping
)

SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
)

db_session = scoped_session(SessionLocal)

def get_db():
    db = db_session()
    try:
        yield db
    finally:
        db.close()
