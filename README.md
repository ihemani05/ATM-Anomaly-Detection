Video Presentation: https://www.youtube.com/watch?v=8Etu5iqMcIA&ab_channel=athariandre __
Slidedeck: https://docs.google.com/presentation/d/1leQ-X4vJbSHk4fjUhDmZ2ZQFjhvLcHfXOcsDPdNQnbo/edit?usp=sharing __


## Inspiration
With the rapid growth in ATM usage, robust fraud detection is essential to ensure financial security for ATM owners. This project was motivated by the need to equip ATM owners with real-time insights, enabling them to prevent fraud and protect their customers.

## What it does
ATM Anomaly Fraud Detection is a dashboard tool that allows ATM owner to monitor their ATM transactions for unusual patterns indicative of fraudulent activity. When a transaction is flagged as fraudulent, the dashboard sends an alert to the ATM owner, enabling immediate action to prevent potential fraud.

## How we built it
The project was built using Python and machine learning algorithms to analyze ATM transaction data and detect whether or not a transaction was fraudulent. We utilized libraries like scikit-learn for data processing and model building. The dashboard interface was developed using React, HTML and Flask for backend integration. 

## Challenges we ran into
Handling class imbalance in the dataset was a significant challenge, as fraudulent transactions are relatively rare. We decided to stratify the data so that the fraudulent and genuine cases were more balanced to well train the data. Additionally, designing a dashboard that presents data clearly and efficiently took careful planning, as we wanted it to be intuitive for ATM owners.  We also had to simulate ATM data as we didn't have access to real ATM data as if we were a banking company like Capital One.

## Accomplishments that we're proud of
We’re proud to have developed a user-friendly dashboard that effectively detects anomalies and alerts ATM owners in real time. The solution combines accurate fraud detection with an accessible interface, making it both functional and user-friendly.

## What we learned
We learned about anomaly detection and dealing with imbalanced datasets, which are common in fraud detection projects. This project also taught us about user-centered design, as we focused on building a dashboard that ATM owners could easily navigate and understand.

## What's next for ATM Anomaly Fraud Detection
We plan to get real-time ATM data to further improve the accuracy of our model.  We also plan to add more customization options for ATM owners, allowing them to set specific thresholds for alerts and view more detailed reports of flagged transactions. Additionally, we would like to implement text notifications to allow users to be notified to their phones, so that they do not have to have the dashboard open to be notified. 
