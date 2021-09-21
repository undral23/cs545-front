import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components';
import { Products, ProductForm, Shop, ShoppingCart, PersonalInfo, PaymentInfo, ConfirmOrder, Orders } from './pages';

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="container">

          <Route exact path={["/", "buy"]} component={Shop} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={ProductForm} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/personal-info" component={PersonalInfo} />
          <Route exact path="/payment-info" component={PaymentInfo} />
          <Route exact path="/confirm-order" component={ConfirmOrder} />
          <Route exact path="/orders" component={Orders} />
        </main>
      </Router>
    </>
  );
}

export default App;
