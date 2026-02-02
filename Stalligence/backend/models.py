from pydantic import BaseModel
from typing import List, Optional

class PlatformProduct(BaseModel):
    name: str
    price: float
    stock: int
    currency: str

class UnifiedProduct(BaseModel):
    product_name: str
    sku: str
    platforms: List[PlatformProduct]
    lowest_price: float
    price_gap: float
    currency: str = "INR"

class AggregatedStats(BaseModel):
    total_revenue: float
    total_orders: int
    system_latency_ms: float
    low_stock_count: int
