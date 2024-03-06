import React, { FormEvent, useState } from 'react';
import httpClient from "../httpClient";
//import { renderIntoDocument } from 'react-dom/test-utils';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();


  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/; // password requiredmnet same as sign in page.
    return regex.test(password);
  };

  
  const showToast = (message: string, type: 'success' | 'error'): void => {
    if (type === 'success') {
      // eslint-disable-next-line
      toast.success(message);
    } else {
      // eslint-disable-next-line
      toast.error(message);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // First check if passwords match
    if (password !== retypePassword) {
      showToast("Passwords don't match.","error");
      return;
    }
    // Then check if the password is valid
    if (!validatePassword(password)) {
      showToast('Password must be at least 12 characters long and include uppercase, lowercase, numeric, and special characters.',"error");
      return;
    }
    // If passwords match and the password is valid, clear any existing error messages
    setError('');
    // TODO: Proceed with the signup process (e.g., sending data to an API)

    try{
      const resp = await httpClient.post("//localhost:5000/register" , {
        email,
        password,
        dob: dateOfBirth,
        phone: phoneNumber,
      });

      window.location.href = "/";

    }catch(error: any){
      if(error.response && error.response.status === 401){
        alert("Invalid credientials");
      }else {
        console.error("An error occurred while signing up:", error);
        // Handle other types of errors, such as network errors
      }
    }
  };


    const handleSignIN = (): void => {
      navigate('/')
    }


    return (
   
      <>
        <ToastContainer />

        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Create Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Retype Password"
                  required
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  placeholder="Enter your Phone Number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-calendar"></i>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>
        <div className="panels-container sign-up-mode-leftcontainer ">
          <div className="panel right-panel ">
            <div className="content">
              <h3>InvestEase</h3>
              <p className='frgtp' onClick={handleSignIN}> Don't wait any longer-<span style={{textDecoration: "underline"}}>Sign in</span>now and embark on a path of unique investment opportunities.</p>
            </div>
            <img src="images/undraw_visual_data.svg" className="image" alt="" />
          </div>
        </div>
      </>
    );
  };

export default SignUp;
