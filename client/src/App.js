import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Routess from './components/routing/Routess';
import Catalog from './components/shop/Catalog';
import ProductDetail from './components/shop/ProductDetail';
import Cart from './components/shop/Cart';
import Wishlist from './components/shop/Wishlist';
import AboutUs from './components/shop/AboutUs';
import './fonts/css/all.css';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utlis/setAuthToken';
import { ShopProvider } from './context/ShopContext';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>  {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
  <Provider store={store}>
    <ShopProvider>
    <Router>
      <Fragment>
       <Navbar />
       <div className="alert-stack"><Alert /></div>
       <main className="site-main">
         <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/catalog/:category' element={<Catalog />} />
              <Route path='/product/:slug' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/profiles' element={<AboutUs />} />
              <Route path='/*' element={<Routess />} />
         </Routes>
       </main>
       <Footer />
    </Fragment>
    </Router>
    </ShopProvider>
    </Provider>
  )
}

export default App;
