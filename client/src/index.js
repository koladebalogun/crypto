import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { TransactionProvider } from './context/TransactionContext';
import store from './app/store';
import 'antd/dist/antd.css';
import App from './App';



ReactDOM.render(
  <Router>
    <TransactionProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TransactionProvider>
  </Router>,
  document.getElementById('root')
);


