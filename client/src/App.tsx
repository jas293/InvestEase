import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgetP from './pages/ForgetP';
import './style/style.css';


const App: React.FC = () => {
  const location = useLocation()
console.log(location)
  return (
    <div className='app-container'>
    <div className={location.pathname=='/signup'?"container sign-up-mode":"container"}>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ForgetP" element={<ForgetP />} />
    </Routes>
   </div>
   </div>
  );
};




export default App;


