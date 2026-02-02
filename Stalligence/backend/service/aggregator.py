import asyncio
import httpx
import random
from typing import List, Dict, Any
from pydantic import BaseModel

class RawProductData(BaseModel):
    source: str
    data: Dict[str, Any]

class AggregatorService:
    def __init__(self):
        self.http_client = httpx.AsyncClient()

    async def fetch_shopify(self, sku: str) -> RawProductData:
        # Simulate Network Latency
        await asyncio.sleep(random.uniform(0.1, 0.5))
        # Mock Response
        return RawProductData(
            source="shopify",
            data={
                "title": "Ultra Wireless Buds v2",
                "variants": [{"price": "12999.00", "inventory_quantity": 45}]
            }
        )

    async def fetch_amazon(self, sku: str) -> RawProductData:
        await asyncio.sleep(random.uniform(0.1, 0.6))
        return RawProductData(
            source="amazon",
            data={
                "AttributeSets": [{"ListPrice": {"Amount": 11499.00}}], 
                "FulfillmentChannel": "AMAZON"
            }
        )

    async def fetch_flipkart(self, sku: str) -> RawProductData:
        await asyncio.sleep(random.uniform(0.1, 0.4))
        return RawProductData(
            source="flipkart",
            data={
                "flipkart_selling_price": 11999.00,
                "stock_count": 20
            }
        )

    async def aggregate_product(self, sku: str) -> List[RawProductData]:
        # Concurrently fetch from all sources
        results = await asyncio.gather(
            self.fetch_shopify(sku),
            self.fetch_amazon(sku),
            self.fetch_flipkart(sku)
        )
        return list(results)
    
    async def close(self):
        await self.http_client.aclose()
