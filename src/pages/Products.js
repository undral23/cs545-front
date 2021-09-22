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

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure to delete?")) {
            await axios.delete(`http://localhost:8080/products/${id}`);
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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Number in Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>
                                <Link id={`link-${p.id}`} to={'products/' + p.id}>{p.id}</Link>
                            </td>
                            <td>{p.title}</td>
                            <td>{p.description}</td>
                            <td>{p.price}</td>
                            <td>{p.numberInStock}</td>
                            <td><Button
                                id={`btnDelete-${p.id}`}
                                variant="danger"
                                value={p.id}
                                onClick={handleDelete}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </div>
    );
}