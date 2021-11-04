import './App.css';
import HomePage from './containers/HomePage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './action';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import { updateCart } from './action/cart.action';
import CheckoutPage from './containers/CheckoutPage';
import OrderPage from './containers/OrderPage';

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)


  useEffect(()=>{

    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }

  },[auth.authenticate])

  useEffect(()=>{
    dispatch(updateCart())
  },[auth.authenticate])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
