import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // <== IMPORTAR O PROVIDER
import App from './App';
import store from './app/store';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
