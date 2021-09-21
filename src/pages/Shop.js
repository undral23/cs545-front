import { useState, useEffect } from "react";
import axios from 'axios';
import { BuyProduct } from './BuyProduct';


export const Shop = () => {
    const [products, setProducts] = useState([]);
    const loadProducts = async () => {
        const resp = await axios.get('http://localhost:8080/products');
        setProducts(resp.data);
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

                    <BuyProduct key={p.productNumber} product={p} />

                ))}
            </div>
        </div>
    );
}