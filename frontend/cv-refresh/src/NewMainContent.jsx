import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MetricBox from './MetricBox';
import BarChart from './BarChart';
import './NewMainContext.css'; // Import the CSS file

function NewMainContent() {
  const [transactionMetrics, setTransactionMetrics] = useState({ field1: '0', field3: '0' });
  const [winRate, setWinRate] = useState(0);
  const [barChartData, setBarChartData] = useState({ labels: [], data: [] });
  const [activeAlerts, setActiveAlerts] = useState(0); // State for active alerts
  const [alertChartData, setAlertChartData] = useState({ labels: [], data: [] }); // State for alert chart data
  const [totalFraudulentMoney, setTotalFraudulentMoney] = useState(0); // State for total fraudulent money moved
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  useEffect(() => {
    if (userId) {
      axios.post('http://localhost:8080/getTransactions', { user_id: userId })
        .then(response => {
          const transactions = response.data.transaction_ids; // Adjusted to match your API response
          const count = transactions.length;
          const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amt, 0);
          const fraudCount = transactions.filter(transaction => transaction.fraud === 1).length;
          const winRate = (fraudCount / count) * 100;

          setTransactionMetrics({
            field1: count,
            field3: totalAmount.toFixed(2)
          });
          setWinRate(winRate.toFixed(2));

          // Process data for bar chart
          const transactionsByHour = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.time * 1000); // Convert Unix timestamp to Date object
            const hour = date.getHours(); // Get the hour from the Date object
            if (!acc[hour]) {
              acc[hour] = 0;
            }
            acc[hour] += 1; // Count the number of transactions
            return acc;
          }, {});

          const labels = Object.keys(transactionsByHour).sort((a, b) => a - b);
          const data = labels.map(hour => transactionsByHour[hour]);

          setBarChartData({ labels, data });
        })
        .catch(error => {
          console.error('Error fetching transactions:', error);
        });

      // Fetch fraudulent transactions
      axios.post('http://localhost:8080/getFraudulentTransactions', { user_id: userId })
        .then(response => {
          const fraudulentTransactions = response.data.fraudulent_transactions;
          setActiveAlerts(fraudulentTransactions.length); // Set the number of active alerts

          // Process data for alert chart
          const alertsByDate = fraudulentTransactions.reduce((acc, transaction) => {
            const date = new Date(transaction.time * 1000); // Convert Unix timestamp to Date object
            const dateString = date.toISOString().split('T')[0]; // Get the date string in YYYY-MM-DD format
            if (!acc[dateString]) {
              acc[dateString] = 0;
            }
            acc[dateString] += 1; // Count the number of alerts
            return acc;
          }, {});

          const alertLabels = Object.keys(alertsByDate).sort((a, b) => new Date(a) - new Date(b));
          const alertData = alertLabels.map(date => alertsByDate[date]);

          setAlertChartData({ labels: alertLabels, data: alertData });
        })
        .catch(error => {
          console.error('Error fetching fraudulent transactions:', error);
        });

      // Fetch total fraudulent money moved
      axios.post('http://localhost:8080/getTotalFraudulentMoneyMoved', { user_id: userId })
        .then(response => {
          const totalFraudulentMoney = response.data.total_fraudulent_money_moved;
          setTotalFraudulentMoney(totalFraudulentMoney.toFixed(2)); // Set the total fraudulent money moved
        })
        .catch(error => {
          console.error('Error fetching total fraudulent money moved:', error);
        });
    }
  }, [userId]);

  return (
    <div className="dashboard-container">
      {/* Row 1 */}
      <div className="row">
        <div className="card metric-box">
          <MetricBox
            title="Transaction Metrics"
            field1={transactionMetrics.field1}
            field2="Transactions (Past 24hrs)"
            field3={transactionMetrics.field3}
            field4="Total $"
            winRate={winRate} // Pass win rate value
          />
        </div>
        <div className="card bar-chart">
          <BarChart
            title="Transactions Per Hour"
            labels={barChartData.labels}
            data={barChartData.data}
            height={150}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="row">
        <div className="card metric-box">
          <MetricBox
            title="Alert Metrics"
            field1={activeAlerts} // Use active alerts value
            field2="active alerts"
            field3={totalFraudulentMoney} // Display total fraudulent money moved
            field4="Total Fraudulent $"
          />
        </div>
        <div className="card bar-chart">
          <BarChart
            title="Fraudulent Transactions Per Day"
            labels={alertChartData.labels}
            data={alertChartData.data}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}

export default NewMainContent;
