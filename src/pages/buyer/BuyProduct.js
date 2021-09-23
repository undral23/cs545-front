import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Button, Row, Col, Form, ListGroup } from "react-bootstrap";

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { RatingView } from "react-simple-star-rating";
import apiService from "../../services/api.service";
import { ReviewForm } from "./ReviewForm";

export const BuyProduct = (props) => {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);

    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.shoppingCart.find(item => item.product.id === id));

    const [buyInfo, setBuyInfo] = useState({
        product,
        quantity: 1
    });

    const loadProduct = async () => {
        if (id) {
            const data = await apiService.get(`products/${id}`);
            setProduct(data);
            setBuyInfo({ ...buyInfo, product: data });
        }
    }

    const loadReviews = async () => {
        if (id) {
            const data = await apiService.get(`products/${id}/reviews`);
            setReviews(data);
        }
    }

    useEffect(() => {
        loadProduct();
        loadReviews();
    }, [id]);

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

    const handleSaveReview = () => {
        // this.loadReviews();
    }

    return (

        <div>
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={product.image} />
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
                        <Card.Footer>
                            <Row>
                                <Col md="7">
                                    <Form.Control
                                        id={`inputQuantity-${product.id}`}
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        required
                                        value={buyInfo.quantity}
                                        onChange={handleFieldChange}
                                    />
                                </Col>
                                <Button id={`btnBuy-${product.id}`} variant="primary" onClick={handleBuy}>Add to Cart</Button>
                            </Row>

                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ReviewForm id={product.id} onSave={handleSaveReview} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Reviews </h4>
                    <ListGroup>
                        {reviews.map(review => (
                            <ListGroup.Item key={review.id}>
                                <RatingView size={15} ratingValue={review.stars} />
                                <span className="ml-3">{review.comment}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

        </div>
    );
}