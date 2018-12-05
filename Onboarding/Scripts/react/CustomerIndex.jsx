import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomerTable from './Customers/ListOfCustomers.jsx';

const app = document.getElementById('customer');
ReactDOM.render(<CustomerTable />, app);