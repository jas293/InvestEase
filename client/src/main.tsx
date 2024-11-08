// main.tsx or index.tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/style.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import ForgetP from './pages/ForgetP';




const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');




const root = ReactDOM.createRoot(rootElement);
root.render(
    <Router>
    <App />
  </Router>
);
