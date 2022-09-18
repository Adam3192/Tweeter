import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './contexts/UserProvider';
import { TweetProvider } from './contexts/TweetProvider';
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
      <UserProvider>
      <TweetProvider>
    <App />
    </TweetProvider>
   </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
