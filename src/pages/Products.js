import { useState, useEffect } from "react";
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from "react-redux";

import {
    Link
} from "react-router-dom";
import apiService from "../services/api.service";

export const Products = ({ history }) => {
    const [products, setProducts] = useState([]);
    const userDetails = useSelector(state => state.userDetails) || {};

    const loadProducts = async () => {
        const data = await apiService.get(
            userDetails.roles === 'SELLER' ?
                `products?userName=${userDetails.username}`
                :
                `products`);

        setProducts(data);
    }
    useEffect(() => {
        loadProducts();
    }, []);

    const handleCreate = (e) => {
        history.push('/products/new');
    }

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure to delete?")) {
            await apiService.delete(`products/${id}`);
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