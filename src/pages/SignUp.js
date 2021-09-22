import React, { useState } from "react";
import { Card, Button, Row, Col, Form, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import productLogo from '../product.svg';

import { useDispatch, useSelector } from 'react-redux';
import "./SignUp.css"

export const SignUp = (props) => {
    const { product } = props;

    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.shoppingCart.find(item => item.product.productNumber === product.productNumber));

    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'buyer'
    });

    const handleChange = (val) => setUser(val);

    return (

        <Form className="form-signup">
            <h1 className="h3 mb-3 font-weight-normal">Sign up</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Confirm Password" required />
            <div className="checkbox mb-3">
                <Form.Check
                    inline
                    label="Buyer"
                    name="group1"
                    type="radio"
                    id={`inline-radio-buyer`}
                />
                <Form.Check
                    inline
                    label="Seller"
                    name="group1"
                    type="radio"
                    id={`inline-radio-seller`}
                />
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </Form>
    );
}