import { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Button, Row, Col } from 'react-bootstrap';

import {
    Link
} from "react-router-dom";

export const Products = ({ history }) => {
    const [products, setProducts] = useState([]);
    const loadProducts = async () => {
        const resp = await axios.get('http://localhost:8080/products');
        setProducts(resp.data);
    }
    useEffect(() => {
        loadProducts();
    }, []);

    const handleCreate = (e) => {
        history.push('/products/new');
    }

    const deleteProduct = async (productNumber) => {
        if (window.confirm("Are you sure to delete?")) {
            await axios.delete(`http://localhost:8080/products/${productNumber}`);
            await loadProducts();
        }
    }

    const handleDelete = (e) => {
        deleteProduct(e.target.value);
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Products
                    </h2>
                </Col>
                <Col className="text-right">
                    <Button id="btnCreate" type="button" onClick={handleCreate}>Create New</Button>
                </Col>
            </Row>

            <hr />
            <Table id="tableMain" striped bordered hover>
                <thead>
                    <tr>
                        <th>Product #</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Number in Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.productNumber}>
                            <td>
                                <Link id={`link-${p.productNumber}`} to={'products/' + p.productNumber}>{p.productNumber}</Link>
                            </td>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.price}</td>
                            <td>{p.numberInStock}</td>
                            <td><Button
                                id={`btnDelete-${p.productNumber}`}
                                variant="danger"
                                value={p.productNumber}
                                onClick={handleDelete}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>
    );
}