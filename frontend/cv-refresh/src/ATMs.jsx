import { useState, useEffect } from 'react';
import './ATMs.css';
import axios from 'axios';

function ATMs() {
  const [data, setData] = useState([]); // State to hold the data
  const [showAllATMs, setShowAllATMs] = useState(false); // State for showing all rows

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get user ID from localStorage
        const response = await axios.post('http://localhost:8080/getATMS', { user_id: userId });
        setData(response.data.atm_ids); // Set the fetched data
        console.log('Fetched ATMs:', response.data.atm_ids);
      } catch (error) {
        console.error('Error fetching ATMs:', error);
      }
    };

    fetchData();
  }, []);

  // Handler for adding a new ATM to the list
  const handleAddATM = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Get user ID from localStorage
      const response = await axios.post('http://localhost:8080/addATM', { user_id: userId });
      const newATM = { atm_id: response.data.atm_id, user_id: userId }; // New ATM entry
      setData((prevData) => [newATM, ...prevData]); // Add new ATM to the top
    } catch (error) {
      console.error('Error adding ATM:', error);
    }
  };

  return (
    <div className="maincontent">
      <h2>ATMs</h2>

      {/* Table to display ATMs */}
      <table>
        <thead>
          <tr>
            <th>ATM ID</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(0, showAllATMs ? data.length : 5) // Show all rows or first 5 rows
            .map((item, index) => (
              <tr key={index}>
                <td>{item.atm_id}</td>
                <td>{item.user_id}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <button onClick={() => setShowAllATMs(!showAllATMs)}>
        {showAllATMs ? 'Show Less -' : 'Show More +'}
      </button>
      <button onClick={handleAddATM} style={{ marginLeft: '10px' }}>
        Add ATM
      </button>
    </div>
  );
}

export default ATMs;