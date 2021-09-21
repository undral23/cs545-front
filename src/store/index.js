import { createStore } from 'redux';

const initialState = {
    shoppingCart: [],
    personalInfo: {},
    paymentInfo: {}
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

    return state;
}
const store = createStore(appReducer);
export default store;