import React from 'react';
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Protected from './components/Protected.js'
import AddProduct from './components/AddProduct.js'
import UpdateProduct from './components/UpdateProduct.js'
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use( function(config){
  var user_info = JSON.parse(localStorage.getItem('user-info'));
  var token = user_info? user_info.token : null;
  config.headers.Authorization = token? `Bearer ${token}`:'';
  return config;
});

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
