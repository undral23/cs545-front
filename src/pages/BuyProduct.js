import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import productLogo from '../product.svg';

import { useDispatch, useSelector } from 'react-redux';

export const BuyProduct = (props) => {
    const { product } = props;

    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.shoppingCart.find(item => item.product.productNumber === product.productNumber));

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
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={productLogo} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Title className="text-primary">${product.price}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Card.Text>
                        (in stock: {product.numberInStock})
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col md="7">
                            <Form.Control
                                id={`inputQuantity-${product.productNumber}`}
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                required
                                value={buyInfo.quantity}
                                onChange={handleFieldChange}
                            />
                        </Col>
                        <Button id={`btnBuy-${product.productNumber}`} variant="primary" onClick={handleBuy}>Buy</Button>
                    </Row>

                </Card.Footer>
            </Card>
        </div>
    );
}