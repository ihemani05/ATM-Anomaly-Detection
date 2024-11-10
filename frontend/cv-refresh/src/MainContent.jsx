import './MainContext.css';
import { useState, useEffect } from 'react';

function MainContent() {
  const [data, setData] = useState([]); // State to hold the data
  const [showAllAlerts, setShowAllAlerts] = useState(false); // State for Alerts button
  const [showAllLogs, setShowAllLogs] = useState(false); // State for Logs button
  const maxRows = 5; // Maximum rows to display initially

  useEffect(() => {
    const fetchData = async () => {
      const fakeApiData = Array(30)
        .fill(null)
        .map((_, index) => ({
          id: index + 1,
          message: `Log message ${index + 1}`,
          timestamp: new Date().toISOString(),
        }));
      setData(fakeApiData); // Set the fetched data
    };

    fetchData();
  }, []);

  return (
    <div className="maincontent">
      {/* Alerts Section */}
      <div>
        <h2>Alerts</h2>
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
              .slice(0, showAllAlerts ? data.length : maxRows) // Show all or limited rows
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.message}</td>
                  <td>{item.timestamp}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button onClick={() => setShowAllAlerts(!showAllAlerts)}>
          {showAllAlerts ? "Show Less -" : "Show More +"}
        </button>
      </div>

      {/* Logs Section */}
      <div>
        <h2>Logs</h2>
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
              .slice(0, showAllLogs ? data.length : maxRows) // Show all or limited rows
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.message}</td>
                  <td>{item.timestamp}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button onClick={() => setShowAllLogs(!showAllLogs)}>
          {showAllLogs ? "Show Less -" : "Show More +"}
        </button>
      </div>
    </div>
  );
}

export default MainContent;
