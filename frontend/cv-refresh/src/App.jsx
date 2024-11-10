import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import MainContent from './MainContent'; // Alerts and Logs
import ATMs from './ATMs.jsx'; // ATMs component to be created
import NewMainContent from './NewMainContent.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar /> {/* Navbar persists */}
        <Routes>
          <Route path="/" element={<NewMainContent />} /> {/* Dashboard */}
          <Route path="/login" element={<Login />} />
          <Route path="/atms" element={<ATMs />} /> {/* ATMs */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
