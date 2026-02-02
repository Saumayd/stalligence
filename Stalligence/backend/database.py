from databases import Database
import sqlalchemy
import os
from dotenv import load_dotenv

load_dotenv()

# Default to SQLite for local development (so it runs without Postgres installed)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./stalligence.db")

database = Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

# Example Table: Users
users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("email", sqlalchemy.String, unique=True, index=True),
    sqlalchemy.Column("hashed_password", sqlalchemy.String),
    sqlalchemy.Column("api_key_encrypted", sqlalchemy.String, nullable=True),
)

# Example Table: Product History (for analytics)
product_history = sqlalchemy.Table(
    "product_history",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("sku", sqlalchemy.String, index=True),
    sqlalchemy.Column("price", sqlalchemy.Float),
    sqlalchemy.Column("platform", sqlalchemy.String),
    sqlalchemy.Column("timestamp", sqlalchemy.DateTime),
)

engine = sqlalchemy.create_engine(
    DATABASE_URL.replace("postgresql+asyncpg", "postgresql"), 
    pool_pre_ping=True
)
