import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components';
import { Products, ProductForm, Shop, ShoppingCart, PersonalInfo, PaymentInfo, ConfirmOrder, Orders, SignIn, SignUp } from './pages';
import Switch from 'react-bootstrap/esm/Switch';

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <Switch>
            <Route path={["/", "buy"]} component={Shop} />
            <Route path="/products" component={Products} />
            <Route path="/products/:id" component={ProductForm} />
            <Route path="/cart" component={ShoppingCart} />
            <Route path="/personal-info" component={PersonalInfo} />
            <Route path="/payment-info" component={PaymentInfo} />
            <Route path="/confirm-order" component={ConfirmOrder} />
            <Route path="/orders" component={Orders} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
