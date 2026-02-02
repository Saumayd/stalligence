from typing import Dict, Any, List
from service.aggregator import RawProductData
from models import PlatformProduct, UnifiedProduct

class Translator:
    @staticmethod
    def normalize_shopify(data: Dict[str, Any]) -> PlatformProduct:
        # Example Shopify response mapping
        # {"title": "...", "variants": [{"price": "100.00", "inventory_quantity": 10}]}
        variant = data.get("variants", [{}])[0]
        return PlatformProduct(
            name="Shopify",
            price=float(variant.get("price", 0)),
            stock=int(variant.get("inventory_quantity", 0)),
            currency="INR" # Assuming base currency
        )

    @staticmethod
    def normalize_amazon(data: Dict[str, Any]) -> PlatformProduct:
        # Example Amazon SP-API response mapping
        # {"AttributeSets": [{"ListPrice": {"Amount": 1200}}], "FulfillmentChannel": "AMAZON"}
        price_info = data.get("AttributeSets", [{}])[0].get("ListPrice", {})
        return PlatformProduct(
            name="Amazon",
            price=float(price_info.get("Amount", 0)),
            stock=10, # Mock stock as SP-API inventory is separate call
            currency="INR"
        )
    
    @staticmethod
    def normalize_flipkart(data: Dict[str, Any]) -> PlatformProduct:
        # Example Flipkart mapping
        return PlatformProduct(
            name="Flipkart",
            price=float(data.get("flipkart_selling_price", 0)),
            stock=int(data.get("stock_count", 0)),
            currency="INR"
        )

    @classmethod
    def unify(cls, sku: str, product_name: str, raw_data: List[RawProductData]) -> UnifiedProduct:
        platforms = []
        prices = []
        
        for item in raw_data:
            normalized = None
            if item.source == "shopify":
                normalized = cls.normalize_shopify(item.data)
            elif item.source == "amazon":
                normalized = cls.normalize_amazon(item.data)
            elif item.source == "flipkart":
                normalized = cls.normalize_flipkart(item.data)
            
            if normalized:
                platforms.append(normalized)
                prices.append(normalized.price)
        
        min_price = min(prices) if prices else 0
        max_price = max(prices) if prices else 0
        
        return UnifiedProduct(
            product_name=product_name,
            sku=sku,
            platforms=platforms,
            lowest_price=min_price,
            price_gap=max_price - min_price
        )
