import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

import { useDispatch } from 'react-redux';

export const PaymentInfo = ({ history }) => {
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const cleanData = {
        cartType: 'Master',
        number: '',
        expMonth: new Date().getMonth() + 1,
        expYear: new Date().getFullYear(),
        validationCode: ''
    };

    const [paymentInfo, setPaymentInfo] = useState(cleanData);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            savePaymentInfo();
        }

        setValidated(true);
    };

    const savePaymentInfo = async () => {
        dispatch({ type: 'savePaymentInfo', paymentInfo })
        history.push('/confirm-order');
    }

    const handleFieldChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const handleCancel = (e) => {
        history.push('/personal-info');
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                {['Master', 'Visa'].map((cartType) => (
                    <div key={cartType} className="mb-3">
                        <Form.Check
                            inline
                            label={cartType}
                            name="cartType"
                            type='radio'
                            id={`inline-radio-${cartType}`}
                            checked={paymentInfo.cartType === cartType}
                            value={cartType}
                            onChange={handleFieldChange}
                        />
                    </div>
                ))}
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="txtName">
                    <Form.Label>Cart Number</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="number"
                        placeholder="Cart Number"
                        value={paymentInfo.number}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtExpMonth">
                    <Form.Label>Date of Expiry (MM/YYYY)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                required
                                type="number"
                                name="expMonth"
                                placeholder="00"
                                value={paymentInfo.expMonth}
                                onChange={handleFieldChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                required
                                type="number"
                                name="expYear"
                                placeholder="0000"
                                value={paymentInfo.expYear}
                                onChange={handleFieldChange}
                            />
                        </Col>
                    </Row>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="txtPhone">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CVV"
                        name="validationCode"
                        value={paymentInfo.validationCode}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Button type="button"
                        variant="secondary"
                        onClick={handleCancel}>Back</Button>
                </Col>
                <Col className="text-right">
                    <Button type="submit">Next</Button>

                </Col>
            </Row>
        </Form>
    )
}