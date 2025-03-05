import React from 'react';
import ReactDOM from "react-dom/client";
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importar Bootstrap CSS globalmente
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar Bootstrap JS globalmente
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home'
import Prestamos from './Prestamos';
import Cliente from './Cliente';
import Layout from './Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Prestamos' element={<Prestamos />}></Route>
        <Route path='/Cliente' element={<Cliente />}></Route>
        <Route path='/layout' element={<Layout />}></Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


