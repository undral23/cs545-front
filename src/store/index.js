import { createStore } from "redux";
import axios from 'axios';
import Cookies from 'js-cookie';
// import { authSlice } from './auth';

const initialState = {
    shoppingCart: [],
    personalInfo: {},
    paymentInfo: {},
    isAuthenticated: Cookies.get('token') != null,
    userDetails: JSON.parse(localStorage.getItem('user')),
    alerts: [],
    alertId: 0
};

axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + (Cookies.get('token') || '')
};

const appReducer = (state = initialState, action) => {
    if (action.type === 'addProduct') {
        const found = state.shoppingCart.find(c => c.product.productNumber === action.cartItem.product.productNumber);
        if (found) {
            found.quantity += action.cartItem.quantity;
            return {
                ...state,
                shoppingCart: [...state.shoppingCart]
            };
        }
        else {
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, { ...action.cartItem, quantity: +action.cartItem.quantity }]
            };
        }
    }

    if (action.type === 'reduceQuantity') {
        const found = state.shoppingCart.find(c => c.product.productNumber === action.cartItem.product.productNumber);
        if (found) {
            found.quantity -= action.cartItem.quantity;
            if (found.quantity > 0) {
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart]
                };
            }

        }

        return {
            ...state,
            shoppingCart: state.shoppingCart.filter(cartItem => cartItem.product.productNumber !== action.cartItem.product.productNumber)
        };
    }

    if (action.type === 'removeProduct') {
        return {
            ...state,
            shoppingCart: state.shoppingCart.filter(cartItem => cartItem.product.productNumber !== action.cartItem.product.productNumber)
        };
    }

    if (action.type === 'resetShoppingCart') {
        return {
            ...state,
            shoppingCart: []
        };
    }

    if (action.type === 'savePersonalInfo') {
        return {
            ...state,
            personalInfo: action.personalInfo
        };
    }

    if (action.type === 'savePaymentInfo') {
        return {
            ...state,
            paymentInfo: action.paymentInfo
        };
    }

    // if (action.type == 'login') {
    //     const userCred = action.payload;
    //     const dispatch = useDispatch();


    //     // if (Cookies.get('token') != null) {
    //     //     state.isAuthenticated = true
    //     // }
    // }

    if (action.type === 'loginSuccess') {
        Cookies.set('token', action.payload.jwt);
        
        axios.defaults.headers.common = {
            'Authorization': 'Bearer ' + action.payload.jwt
        };

        localStorage.setItem('user', JSON.stringify(action.payload.userDetails));
        return { ...state, isAuthenticated: true, userDetails: action.payload.userDetails };
    }

    if (action.type === 'logout') {
        Cookies.remove('token')
        axios.defaults.headers.common = {
            'Authorization': ''
        };
        localStorage.removeItem('user');
        return { ...state, isAuthenticated: false, userDetails: null}
    }

    // Alert
    if (action.type === 'showAlert') {
        return { ...state, alerts: [...state.alerts, { ...action.payload, id: state.alertId }], alertId: state.alertId + 1 }
    }

    if (action.type === 'closeAlert') {
        return { ...state, alerts: state.alerts.filter(a => a.id !== action.payload) }
    }

    return state;
}

const store = createStore(appReducer);

export default store;