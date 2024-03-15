import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgetP from './pages/ForgetP';
import ResetPassword from './pages/ResetPassword';
import './style/style.css';
import LandingPage from './pages/LandingPage';
import Questionnaire from './pages/Questionnaire';


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
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/Questionnaire" element={<Questionnaire />} />
      
    </Routes>
   </div>
   </div>
  );
};




export default App;


