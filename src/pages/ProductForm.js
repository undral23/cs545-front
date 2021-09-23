import { Form, Row, Col, InputGroup, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import {
    useParams
} from "react-router-dom";
import apiService from '../services/api.service';

export const ProductForm = ({ history }) => {
    const [validated, setValidated] = useState(false);
    let { id } = useParams();

    const cleanProduct = {
        id: "",
        name: "",
        price: 0.0,
        description: "",
        numberInStock: 0
    };

    const [product, setProduct] = useState(cleanProduct);

    const loadProduct = async () => {
        if (id !== 'new') {
            const data = await apiService.get(`products/${id}`);
            setProduct(data);
        }
    }

    useEffect(() => {
        loadProduct();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            saveProduct();
        }

        setValidated(true);
    };

    const saveProduct = async () => {
        try {
            const data = id === 'new' ?
                await apiService.post('products', product) :
                await apiService.put(`products/${id}`, product);
            history.push(`/products/${data.id}`);
            // setProduct(data.data);
        }
        catch (error) {
            console.log(error);
        }
    }



    const handleFieldChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleCancel = (e) => {
        history.push('/products');
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Create/Edit Product</h2>
            <hr />
            <Row className="mb-3">
                {/* <Form.Group as={Col} md="4" controlId="txtProductNumber">
                    <Form.Label>Product Number</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="id"
                        disabled={id !== 'new'}
                        placeholder="Product Number"
                        value={product.id}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group as={Col} md="4" controlId="txtTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={product.title}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtPrice">
                    <Form.Label>Price</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="Price"
                            name="price"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={product.price}
                            onChange={handleFieldChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a price.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="txtDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        type="text"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a description.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtNumberInStock">
                    <Form.Label>Number In Stock</Form.Label>
                    <Form.Control
                        type="number"
                        name="numberInStock"
                        placeholder="Number In Stock"
                        required
                        value={product.numberInStock}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid number.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button type="submit" id="btnSubmit">Save product</Button>
                    <Button type="button"
                        id="btnCancel"
                        className="ml-2"
                        variant="secondary"
                        onClick={handleCancel}>Cancel</Button>
                </Col>
            </Row>
        </Form>
    )
}