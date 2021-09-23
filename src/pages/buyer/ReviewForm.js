import { Form, Row, Col, InputGroup, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating'

import apiService from '../../services/api.service';

export const ReviewForm = (props) => {
    const [validated, setValidated] = useState(false);
    let { id } = props;

    const cleanReview = {
        stars: 3,
        comment: ""
    };

    const [review, setReview] = useState(cleanReview);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            saveReview();
        }

        setValidated(true);
    };

    const handleFieldChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleRateChange = (rate) => {
        setReview({ ...review, stars: rate });
    };

    const handleCancel = () => {
        setReview(cleanReview);
    }

    const saveReview = async () => {
        try {
            await apiService.post(`products/${id}/reviews`, review)
            handleCancel();
            if(props.onSave) {
                props.onSave();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h4>Make a Review</h4>
            <hr />
            <Row className="mb-3">
                <Col>
                    <Rating onClick={handleRateChange} ratingValue={review.stars} />
                </Col>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3" controlId="txtComment">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        placeholder="Comment"
                        name="comment"
                        value={review.comment}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button type="submit" id="btnSubmit">Save review</Button>
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