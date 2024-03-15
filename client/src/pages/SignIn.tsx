/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState , FormEvent, ChangeEvent, useEffect} from 'react';
import httpClient from "../httpClient";
import { NavigateFunction } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { navigate } from 'react-router-dom';




const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history: NavigateFunction = useNavigate();
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
/*
  useEffect(() => {
    // Check if the user is logged in when the component mounts
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Make an API call to check the user's session status
      const response = await httpClient.get("//localhost:5000/login");
      if (response.data.isLoggedIn) {
        setIsLoggedIn(true);
        // User is logged in, redirect to the landing page or dashboard
        navigate('/LandingPage');
      }
    } catch (error) {
      // Handle error
      console.error("Error checking login status:", error);
    }
  };*/

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/; //password requiredmnet same as sign up page.
    return regex.test(password);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const handleForgotPassword = () => {
    history('/ForgetP')
  };

  


  const showToast = (message: string, type: 'success' | 'error'): void => {
    if (type === 'success') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      toast.success(message);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      toast.error(message);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (!validatePassword(password)) {
      showToast('Password must be at least 12 characters long and include uppercase, lowercase, numeric, and special characters.', 'error');
      return;
    }

    //showToast('Signed in successfully!', 'success');

    // Here, you would handle the sign-in logic, possibly sending a request to your backend
    
    console.log(email,password);
    
    try{
      const resp = await httpClient.post("//localhost:5000/login" , {
        email,
        password,
      });

      //window.location.href = "/LandingPage";
      navigate('/LandingPage');

    }catch(error: any){
      if(error.response.status === 401){
        alert("Invalid credientials");
      }
    }
    
  };

  const handleSignUp = (): void => {
    //history('/SignUp') // as of now I made defult here will chnage when we will create Dashboard, history('/dashboard');
    navigate('/signup')
  }
  return (
    <>
      <ToastContainer />
        <><div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input value={email} type="text" placeholder="Email" name="email" onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input value={password} type="password" placeholder="Password" name="password" onChange={handleChange} />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className='frgtp' onClick={handleForgotPassword}> Forgot password?<span>Click here</span></p>
              <p className='frgtp' onClick={handleSignUp}> New here?<span>Sign up</span></p>
            </form>
          </div>
        </div><div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>InvestEase</h3>
                <p>

                  "Join the world of smart investors and plant the seeds of wealth today – sign up now to take control of your financial destiny and watch your investments grow! "
                </p>
                {/* <button onClick={handleSignUp} className="btn transparent" id="sign-up-btn">
                  Sign up
                </button> */}
              </div>
              <img src="images/undraw_investing_re_bov_grey.svg" className="image" alt="logo" />
            </div>
          </div></>
    </>
  );
};

export default SignIn;
