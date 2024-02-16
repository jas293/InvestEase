import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/navbar';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import ForgetP from './pages/ForgetP';




const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ForgetP" element={<ForgetP />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};




export default App;
