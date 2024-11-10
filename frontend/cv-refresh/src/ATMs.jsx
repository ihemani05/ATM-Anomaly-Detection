import { useState, useEffect } from 'react';
import './ATMs.css';

function ATMs() {
  const [data, setData] = useState([]); // State to hold the data
  const [showAllATMs, setShowAllATMs] = useState(false); // State for showing all rows
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
  const [formInput, setFormInput] = useState({ message: '', timestamp: '' }); // Form input
  const maxRows = 5; // Maximum rows to display initially

  // Simulate API call to fetch data
  useEffect(() => {
    const fetchData = async () => {
      const fakeApiData = Array(30)
        .fill(null)
        .map((_, index) => ({
          id: index + 1,
          message: `ATM message ${index + 1}`,
          timestamp: new Date().toISOString(),
        }));
      setData(fakeApiData); // Set the fetched data
    };

    fetchData();
  }, []);

  // Handler for adding a new ATM to the list
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (!formInput.message || !formInput.timestamp) {
      alert('Please fill in both fields.');
      return;
    }
    const newATM = {
      id: data.length + 1, // Incremental ID
      ...formInput, // Use input values
    };
    setData((prevData) => [newATM, ...prevData]); // Add new ATM to the top
    setFormInput({ message: '', timestamp: '' }); // Clear form inputs
    setShowModal(false); // Close the modal
  };

  return (
    <div className="maincontent">
      <h2>ATMs</h2>

      {/* Table to display ATMs */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(0, showAllATMs ? data.length : maxRows) // Show all or limited rows
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.message}</td>
                <td>{item.timestamp}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <button onClick={() => setShowAllATMs(!showAllATMs)}>
        {showAllATMs ? 'Show Less -' : 'Show More +'}
      </button>
      <button onClick={() => setShowModal(true)} style={{ marginLeft: '10px' }}>
        Add ATM
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New ATM</h3>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>
                  Message:
                  <input
                    type="text"
                    value={formInput.message}
                    onChange={(e) => setFormInput({ ...formInput, message: e.target.value })}
                    placeholder="Enter message"
                  />
                </label>
              </div>
              <div>
                <label>
                  Timestamp:
                  <input
                    type="text"
                    value={formInput.timestamp}
                    onChange={(e) => setFormInput({ ...formInput, timestamp: e.target.value })}
                    placeholder="Enter timestamp"
                  />
                </label>
              </div>
              <div>
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ATMs;
