import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './MetrixBox.css'; // Import the CSS file

function MetricBox(props) {
  return (
    <div className='metricBox'>
      <h3>{props.title}</h3>
      <div className='fields' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2>{props.field1}</h2>
          <h4>{props.field2}</h4>
        </div>
        <div style={{ margin: '0 10px' }}>
          <h2>{props.field3}</h2>
          <h4>{props.field4}</h4>
        </div>
        <div style={{ width: '80px', height: '80px', visibility: props.winRate !== undefined ? 'visible' : 'hidden' }}>
          {props.winRate !== undefined && (
            <>
              <CircularProgressbar
                value={props.winRate} // Win rate value (e.g., 32.07)
                text={`${props.winRate}%`}
                styles={buildStyles({
                  textColor: '#000', // Change text color to black
                  pathColor: '#D22E1E', // Capital One red
                  trailColor: '#003355', // Dark blue for the trail
                })}
              />
              <h4>Fraud%</h4>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MetricBox;
