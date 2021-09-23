import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

import apiService from '../../services/api.service';

export const Register = ({ history }) => {
    const [validated, setValidated] = useState(false);

    const cleanUser = {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "BUYER"
    };

    const [user, setUser] = useState(cleanUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            saveUser();
        }

        setValidated(true);
    };

    const saveUser = async () => {
        try {
            await apiService.post('register', user, { successMessage: 'Successfully registered!' });
            history.push(`/signin`);
        }
        catch (error) {
            console.log(error);
        }
    }



    const handleFieldChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRadioChange = (e) => {
        let role = 'BUYER';

        if (e.target.value === 'SELLER' && e.target.checked) {
            role = 'SELLER';
        }

        setUser({ ...user, role });
    };

    const handleCancel = (e) => {
        history.push('/users');
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Register</h2>
            <hr />
            <Row className="mb-3">
                <Col>
                    <Form.Check
                        inline
                        label="Buyer"
                        name="role"
                        type="radio"
                        value="BUYER"
                        checked={user.role === 'BUYER'}
                        onChange={handleRadioChange}
                        id={`inline-radio-buyer`}
                    />
                    <Form.Check
                        inline
                        label="Seller"
                        name="role"
                        type="radio"
                        value="SELLER"
                        checked={user.role === 'SELLER'}
                        onChange={handleRadioChange}
                        id={`inline-radio-seller`}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="txtUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={user.username}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="txtFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="txtLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={user.lastName}
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
                        value={user.email}
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Col className="text-right">
                    <Button type="submit" id="btnSubmit">Register</Button>
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