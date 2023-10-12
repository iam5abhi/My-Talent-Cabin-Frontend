import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css'
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([{ path: "/", element: <div>Test page</div> }]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter router={router}>
    <App />
  </BrowserRouter>
);

