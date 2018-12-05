import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductTable from './Products/ListOfProducts.jsx';


const app = document.getElementById('product');
ReactDOM.render(<ProductTable />, app);