import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

import { useDispatch } from 'react-redux';

export const PersonalInfo = ({ history }) => {
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();

    const cleanPerson = {
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    };

    const [personalInfo, setPersonalInfo] = useState(cleanPerson);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            savePersonalInfo();
        }

        setValidated(true);
    };

    const savePersonalInfo = async () => {
        dispatch({ type: 'savePersonalInfo', personalInfo })
        history.push('/payment-info');
    }

    const handleFieldChange = (e) => {
        setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
    };

    const handleCancel = (e) => {
        history.push('/cart');
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="txtName">
                    <Form.Label>name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="name"
                        placeholder="name"
                        value={personalInfo.name}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="txtStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        name="street"
                        type="text"
                        placeholder="Street"
                        required
                        value={personalInfo.street}
                        onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a street.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="txtCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        name="city"
                        type="text"
                        placeholder="City"
                        required
                        value={personalInfo.city}
                        onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="txtState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        name="state"
                        type="text"
                        placeholder="State"
                        required
                        value={personalInfo.state}
                        onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="txtZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        name="zip"
                        type="text"
                        placeholder="Zip"
                        required
                        value={personalInfo.zip}
                        onChange={handleFieldChange} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Zip.
                    </Form.Control.Feedback>
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