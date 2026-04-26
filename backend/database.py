from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from settings import settings

# DATABASE_URL = "mssql+pyodbc://username:password@server:port/db_name?driver=ODBC+Driver+17+for+SQL+Server"

# DATABASE_URL = settings.DATABASE_URL

DATABASE_URL = (
    "mssql+pyodbc://@(localdb)\\MSSQLLocalDB/FuoyeProject"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes")

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
