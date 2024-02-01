// main.tsx or index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/style.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);
