import React from 'react';
import MetricBox from './MetricBox';
import BarChart from './BarChart';
import './NewMainContext.css'; // Import the CSS file

function NewMainContent() {
  return (
    <div className="dashboard-container">
      {/* Row 1 */}
      <div className="row">
        <div className="card metric-box">
          <MetricBox
            title="Transaction Metrics"
            field1="5000"
            field2="Transactions (Past 24hrs)"
            field3="5000"
            field4="Total $"
            winRate={32.07} // Pass win rate value
          />
        </div>
        <div className="card bar-chart">
          <BarChart
            title="Emails Sent Per Day"
            labels={['24 Oct', '31 Oct', '7 Nov', '14 Nov']}
            data={[5000, 8000, 6000, 7000]}
            height={150}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="row">
        <div className="card metric-box">
          <MetricBox
            title="Alert Metrics"
            field1="5000"
            field2="active alerts"
            field3="bars"
            field4="Severity"
          />
        </div>
        <div className="card bar-chart">
          <BarChart
            title="Calls Per Day"
            labels={['24 Oct', '31 Oct', '7 Nov', '14 Nov']}
            data={[200, 400, 300, 500]}
            height={150}
          />
        </div>
      </div>
    </div>
  );
}

export default NewMainContent;
