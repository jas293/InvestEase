import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Navbar from './pages/navbar.tsx';



const App = () => {
  return (  
  <Router>
    <Routes>
    
      <Route path="/pages" element={<Navbar />} />

    </Routes>
  </Router>
  
  )
}

export default App;
