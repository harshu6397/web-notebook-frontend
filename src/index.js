import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AlertState from './context/Alert/AlertState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AlertState>
    <App />
    </AlertState>
);