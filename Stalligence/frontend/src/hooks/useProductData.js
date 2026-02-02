import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductData = (sku) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [latency, setLatency] = useState(0);

    const fetchData = async () => {
        const start = Date.now();
        try {
            // In a real scenario, this URL would be from an env variable
            const response = await axios.get(`http://127.0.0.1:8000/api/product/${sku}`);
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching product data:", err);
            setError(err);
        } finally {
            const end = Date.now();
            setLatency(end - start);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Poll every 5 seconds
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [sku]);

    return { data, loading, error, latency, refetch: fetchData };
};

export default useProductData;
