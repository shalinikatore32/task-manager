import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toastifyCustom.css';
import { UseAuth } from './store-token/UseAuth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UseAuth>
    <ToastContainer
      toastClassName="Toastify__toast--custom"
      progressClassName="Toastify__progress-bar--custom"
    />
    <AppWrapper />
    </UseAuth>
    
  </React.StrictMode>
);


