import './App.css';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, AlertDismissible } from './components';
import { Products, ProductForm, Shop, ShoppingCart, PersonalInfo, PaymentInfo, ConfirmOrder, Orders, SignIn, Register, Sellers, Reviews } from './pages';
import Switch from 'react-bootstrap/esm/Switch';
import { useDispatch, useSelector } from 'react-redux';
import alertService from './services/alert.service';

function App() {
  const dispatch = useDispatch();
  alertService.setup(dispatch);

  const isAuthenticated = useSelector(state => state.isAuthenticated);

  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <Switch>
            <Redirect from="/" to="/buy" />
            <Route path="/products/" component={Products} />
            <Route path="/products/:id" component={ProductForm} />
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/personal-info" component={PersonalInfo} />
            <Route path="/payment-info" component={PaymentInfo} />
            <Route path="/confirm-order" component={ConfirmOrder} />
            <Route path="/orders" component={Orders} />
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path="/buy" component={Shop} />
            <Route path="/sellers" component={Sellers} />
            <Route path="/reviews" component={Reviews} />
            {isAuthenticated ? <Redirect from="signin" to="/" /> : <></>}
          </Switch>
        </main>
        <AlertDismissible />
      </Router>
    </>
  );
}

export default App;
