import { Link } from 'react-router-dom'; // This is necessary to use the Link component


const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        {/* You will need to add the proper form handling here */}
        <input type="email" placeholder="Email address" required />
        <input type="password" placeholder="Create Password" required />
        <input type="password" placeholder="Retype Password" required />
        <input type="tel" placeholder="Enter your Phone Number" required />
        <input type="date" placeholder="Date of Birth" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>g
        Already have an account?  <Link to="/">Sign in here!</Link>
      </p>
    </div>
  );
};

export default SignUp;
