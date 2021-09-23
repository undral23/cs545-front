import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";


export const ProductOverview = (props) => {
    const { product } = props;

    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.shoppingCart.find(item => item.product.id === product.id));

    const [buyInfo, setBuyInfo] = useState({
        product,
        quantity: 1
    });

    const handleFieldChange = (e) => {
        setBuyInfo({ ...buyInfo, [e.target.name]: e.target.value });
    };

    const checkAvailability = () => {
        const quantity = +buyInfo.quantity + ((cartItem && cartItem.quantity) || 0);
        return quantity <= product.numberInStock;
    }

    const handleBuy = (e) => {
        if (!checkAvailability()) {
            alert('Quantity unavailable');
            return;
        }

        dispatch({ type: 'addProduct', cartItem: buyInfo });
        console.log('Added to Cart');
    }

    return (

        <div className="col-md-4">
            <Link to={`/shop/${product.id}`}>
                <Card style={{ width: '100%' }}>

                    <Row noGutters={true}>
                        <Col className="text-center">
                            <Card.Img variant="top" src={product.image} style={{ maxHeight: '200px', maxWidth: '200px' }} />
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Title className="text-primary">${product.price}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Card.Text>
                                    (in stock: {product.numberInStock})
                                </Card.Text>
                                <Card.Text>
                                    Rate: {product.rating}
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                    {/* <Card.Img variant="top" src={product.image} /> */}

                </Card>
            </Link>
        </div>
    );
}