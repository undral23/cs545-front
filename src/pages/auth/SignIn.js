import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import "./SignIn.css"
import apiService from '../../services/api.service';

export const SignIn = (props) => {
    const dispatch = useDispatch();
    const formData = useRef();

    const loginHandler = (e) => {
        e.preventDefault();
        const form = formData.current
        const userCredentials = { username: form['username'].value, password: form['password'].value };

        apiService.post('auth', userCredentials, { successMessage: false })
            .then(response => {
                dispatch({ type: 'loginSuccess', payload: response });
                if (response.userDetails.roles === "BUYER") {
                    props.history.push("/buy");
                } else {
                    props.history.push("/products");
                }
            })
            .catch(err => console.log(err.message));
    }

    return (

        <form className="form-signin" ref={formData} onSubmit={loginHandler}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputUsername" className="sr-only">Username</label>
            <input type="text" id="inputUsername" className="form-control" placeholder="Username" name="username" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" required />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
}