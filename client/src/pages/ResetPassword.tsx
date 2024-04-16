import React, {useState , useEffect, FormEvent} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import httpClient from "../httpClient";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  /*const [email, setEmail] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  */
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    const tokenParam = params.get('token');
    /*const emailParam = params.get('email');
    const statusParam = params.get('status');*/

    if (idParam && tokenParam /*&& emailParam && statusParam */) {
      setId(idParam);
      setToken(tokenParam);
      /*setEmail(emailParam);
      setVerificationStatus(statusParam);*/
    }
  }, []);

  /*Setup requirements for the password*/
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

    // check if the password is valid
    if (!validatePassword(password)) {
      showToast('Password must be at least 12 characters long and include uppercase, lowercase, numeric, and special characters.',"error");
      return;
    }
    // check if passwords match
    if(password !== retypePassword){
      showToast("Passwords don't match.","error");
      return;
    }

    // If passwords match and the password is valid, clear any existing error messages
    setError('');
   
    // TODO: Proceed with the signup process (e.g., sending data to an API)

    try{
      const resp = await httpClient.post("//localhost:5000/reset-Password" , {
        id,
        token,  
        password
      });
      //console.log(email);
      window.location.href = "/SignIn";

    }catch(error: any){
      if(error.response && error.response.status === 401){
        alert("Invalid credientials");
      }else {
        console.error("An error occurred while signing up:", error);
        // Handle other types of errors, such as network errors
      }
    }
  };
  
  return (
    <>
    <ToastContainer />
    <><div className="forms-container">
    <div className="signin-signup">
      <form action='#' className='reset-password' onSubmit={handleSubmit}>
      <h2 className="title">Reset Password</h2>
      <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="password"
              placeholder="Create Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="password"
              placeholder="Re-enter Password"
              required
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)} />
              </div>
          
        <input type="submit" className="btn" value="Reset Password" />
      </form>
    </div>
  </div>
  <div className="panels-container">
    <div className="panel left-panel">
      <p>
        "Join the world of smart investors and plant the seeds of wealth today now to take control of your financial destiny and watch your investments grow! "
      </p>
      <img src="images/undraw_investing_re_bov_grey.svg" className="image" alt="logo" />
    </div>
  </div>
  </>
  </>
  );
};

export default ResetPassword;
