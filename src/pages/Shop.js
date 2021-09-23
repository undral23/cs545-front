import { useState, useEffect } from "react";
import apiService from "../services/api.service";
import { BuyProduct } from './BuyProduct';


export const Shop = () => {
    const [products, setProducts] = useState([]);
    const loadProducts = async () => {
        const data = await apiService.get('products');
        setProducts(data);
    }

    useEffect(() => {
        (async () => {
            await loadProducts();
        })();
    }, []);

    return (
        <div className="container marketing">
            <div className="row">
                {products.map(p => (

                    <BuyProduct key={p.id} product={p} />

                ))}
            </div>
        </div>
    );
}