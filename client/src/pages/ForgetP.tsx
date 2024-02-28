import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetP: React.FC = () => {
  const [email, setEmail] = useState('');
  // const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // Add logic to handle password reset here, this could involve sending the email to the backend server
    // which would then send a password reset link to the user email for restet link. 
    console.log('Request password reset for:', email);

    // Show success message or handle errors
    // For now, we'll just log to the console and navigate to the sign-in page
    navigate('/');
  };
  const handleSignUp = (): void => {
    navigate('/signup') // as defult I put sign up we can chnage logic later this commnet will help you to conncted with backend. 
  }

  return (
   
    <>

    <div className="forms-container">
    <div className="signin-signup">
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <h2 className="title">Forgot password</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
          type="email"
          placeholder="Enter your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
      
        <input type="submit" value="Reset Password" className="btn solid" />
      </form>
    </div>
  </div><div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>InvestEase</h3>
          <p className='frgtp' onClick={handleSignUp}>"Join the world of smart investors–<span style={{textDecoration: "underline"}}>Sign Up</span>now to take control of your financial destiny and watch your investments grow!"</p>
          <button  onClick={handleSignUp} className="btn transparent" id="sign-up-btn">
            Sign up
          </button>
        </div>
        <img src="images/undraw_investing_re_bov_grey.svg" className="image" alt="logo" />
      </div>
    </div></>
  );
};

export default ForgetP;
