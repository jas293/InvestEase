import React from 'react';
import Navbar from './pages/Navbar'; // Assuming this is the correct path
import SignIn from './pages/SignIn'; // Assuming this is the correct path


const App = () => {
  return (
    <>
      <Navbar /> {/* Navbar will be displayed at the top */}
      <SignIn /> {/* SignIn component will follow */}
    </>
  );
};


export default App;
