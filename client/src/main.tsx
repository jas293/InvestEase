// main.tsx or index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure the path to App is correct


// If you have a global stylesheet, import it here
import './style/style.css'; // Ensure the path to your stylesheet is correct


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');


const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
