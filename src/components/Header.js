import {
    NavLink
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

const allMenuItems = {
    buyer: [{
        to: '/buy',
        title: 'Buy'
    },
    {
        to: '/cart',
        title: 'Cart'
    }
    ],
    seller: [{
        to: '/products',
        title: 'Products'
    },
    {
        to: '/orders',
        title: 'Orders'
    }
    ],
    admin: [
        {
            to: '/sellers',
            title: 'Sellers'
        },
        {
            to: '/reviews',
            title: 'Reviews'
        }
    ]
};

export const Header = () => {
    const cartItemCount = useSelector(state => state.shoppingCart.length);
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const userDetails = useSelector(state => state.userDetails);

    const menuItems = userDetails ? allMenuItems[userDetails.roles.toLowerCase()] : [];

    const dispatch = useDispatch();

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch({ type: 'logout' });
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Store:::CS545</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            {
                                menuItems.map(item => (
                                    item.to !== '/cart' ? (<li key={item.to} className="nav-item">
                                        <NavLink activeClassName="active" className="nav-link" to={item.to}>{item.title}</NavLink>
                                    </li>) : (
                                        <li className="nav-item">
                                            <NavLink activeClassName="active" className="nav-link position-relative" to="/cart">Cart
                                                {
                                                    cartItemCount ? (
                                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                            {cartItemCount}
                                                        </span>
                                                    ) : ''
                                                }
                                            </NavLink>
                                        </li>
                                    )
                                ))
                            }
                        </ul>
                    </div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {isAuthenticated}
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <a className="nav-link" onClick={logoutHandler} href="#">logout</a>
                            </li>) : (
                            <>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/signin">Sign In</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
}