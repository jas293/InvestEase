import React, { useState } from 'react';
import httpClient from "../httpClient";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();




  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return regex.test(password);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error('Password must be at least 12 characters long and include uppercase, lowercase, numeric, and special characters.');
      return;
    }
    //toast.success('Signed in successfully!');
    // Here, you would handle the sign-in logic, possibly sending a request to your backend
    
    console.log(email,password);
    
    try{
      const resp = await httpClient.post("//localhost:5000/login" , {
        email,
        password,
      });

      window.location.href = "/SignUp";

    }catch(error: any){
      if(error.response.status === 401){
        alert("Invalid credientials");
      }
    }
    
  };




  return (
    <div className="signin-container">
      <ToastContainer />
      <h2>Login</h2>
      <form onClick={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
     
       
        <p><a href="./ForgetP">Forgot password?</a></p>




        {/* Link to sign up page */}
        <p>Need an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
      </form>
    </div>
  );
};




export default SignIn;
