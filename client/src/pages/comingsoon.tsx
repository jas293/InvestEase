import '../style/comingsoon.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import paperImage from '../images/paper.png';

const ComingSoon = () => {

  useEffect(() => {
    // When the component mounts, add a class to the container to hide the half circle
    document.querySelector('.container')?.classList.add('hide-half-circle');

    // When the component unmounts, remove the class
    return () => {
      document.querySelector('.container')?.classList.remove('hide-half-circle');
    };
  }, []);
    return (
        <div className="coming-soon">
          <h1 className='ft'>Feature Coming Soon</h1>
          <img src={paperImage} alt="Paper" className="img-paper" />
          <Link to="/dashboard" className='link'>Back To Dashboard</Link>
        </div>
    );
  };

export default ComingSoon;