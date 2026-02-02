from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from service.aggregator import AggregatorService
from service.normalization import Translator
from models import UnifiedProduct
from database import database, engine, metadata
import auth

metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    yield
    await database.disconnect()

app = FastAPI(title="Stalligence API", version="0.1.0", lifespan=lifespan)

app.include_router(auth.router, prefix="/auth", tags=["auth"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Stalligence S2S Aggregator API Online"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/api/product/{sku}", response_model=UnifiedProduct)
async def get_product_intelligence(sku: str):
    aggregator = AggregatorService()
    try:
        raw_data = await aggregator.aggregate_product(sku)
        unified_data = Translator.unify(sku, "Ultra Wireless Buds v2", raw_data)
        return unified_data
    finally:
        await aggregator.close()
