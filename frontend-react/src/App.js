import React from 'react';
import './App.css'
import {Button} from 'react-bootstrap';
import Header from './components/Header.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Logout from './components/Logout.js'
import Protected from './components/Protected.js'
import AddProduct from './components/AddProduct.js'
import UpdateProduct from './components/UpdateProduct.js'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={
            <Login />
          }/>
          <Route exact path="/register" element={
            <Register />
          }/>
          <Route exact path="/" element={
            <Protected component={ Home } />
          }/>
          <Route exact path="/add" element= {
            <Protected component={ AddProduct }/>
          }/>
          <Route exact path="/update" element= {
            <Protected component={ UpdateProduct }/>
          }/>
          <Route exact path="/logout" element={
            <Protected component={ Logout } user={ localStorage.getItem('user-info') }/>
          }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
