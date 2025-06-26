// src/App.js
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/Register">Register</Link> | <Link to="/Login">Login</Link>
        </nav>

        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
