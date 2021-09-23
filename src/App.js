import './App.css';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, AlertDismissible } from './components';
import { Products, ProductForm, Shop, ShoppingCart, PersonalInfo, PaymentInfo, ConfirmOrder, Orders, SignIn, Register, Sellers, Reviews, BuyProduct } from './pages';
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
            {isAuthenticated ? <Redirect from="/signin" to="/" /> : <>
              <Redirect from="/" to="/signin" /></>}
            <Route exact path="/products/" component={Products} />
            <Route exact path="/products/:id" component={ProductForm} />
            <Route exact path="/cart" component={ShoppingCart} />
            <Route exact path="/personal-info" component={PersonalInfo} />
            <Route exact path="/payment-info" component={PaymentInfo} />
            <Route exact path="/confirm-order" component={ConfirmOrder} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/buy" component={Shop} />
            <Route exact path="/buy/:id" component={BuyProduct} />
            <Route exact path="/sellers" component={Sellers} />
            <Route exact path="/reviews" component={Reviews} />

          </Switch>
        </main>
        <AlertDismissible />
      </Router>
    </>
  );
}

export default App;
