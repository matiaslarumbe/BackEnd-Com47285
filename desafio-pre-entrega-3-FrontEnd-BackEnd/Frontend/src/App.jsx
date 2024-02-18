import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './components/Register';
import Login from './components/Login';
import NewProducts from './components/NewProducts';
import PasswordRecovery from './components/PasswordRecovery';
import ProductsAndCart from './components/ProductsAndCart';
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products-and-cart' element={<ProductsAndCart />} />
          <Route path='/new-product' element={<NewProducts />} />
          <Route path='/password-recovery' element={<PasswordRecovery />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
