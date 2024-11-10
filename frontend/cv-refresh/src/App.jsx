import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import MainContent from './MainContent'; // Alerts and Logs
import ATMs from './ATMs.jsx'; // ATMs component to be created
import NewMainContent from './NewMainContent.jsx';
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar /> {/* Navbar persists */}
        <Routes>
          <Route path="/" element={<NewMainContent />} /> {/* Dashboard */}
          <Route path="/atms" element={<ATMs />} /> {/* ATMs */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
