from atm import atms
from login import logins
from flask import Flask
import requests


app = Flask(__name__)


@app.route('/logIn')
def logIn():
    data = requests.get_json()
    email,password = data.get('email'), data.get('password')
    user_id = logins.checkLogIn(email, password)
    return{
        'status': 200,
        'user_id': user_id
    }

@app.route('/signUp', methods=['POST'])
def signUp():
    data = requests.get_json()
    email, password = data.get('email'), data.get('password')
    user_id = logins.signUp(email, password)
    return {
        'status': 200,
        'user_id': user_id
    }

@app.route('/addATM', methods=['POST'])
def addATM():
    data = requests.get_json()
    user_id = data.get('user_id')
    atm_id = atms.addATM(user_id)

    return {
        'status': 200,
        'atm_id': atm_id
    }
# made by external front-end (not our main frontend)
@app.route('/addTransaction', methods=['POST'])
def addTransaction():
    data = requests.get_json()
    atm_id = data.get('atm_id')
    transaction_id = atms.addTransaction(atm_id)

    return{
        'status': 200,
        'transaction_id': transaction_id
    }

@app.route('/getATMS', methods=['POST'])
def getATMS():
    data = requests.get_json()
    user_id = requests.get('user_id')
    atms = atms.getATMS(user_id)
    return{
        'status': 200,
        'atms': atms
    }

@app.route('/getTransactions', methods=['POST'])
def getTransactions():
    data = requests.get_json()
    user_id = data.get('user_id')
    transactions = atms.getTransactions(user_id)
    return {
        'status': 200,
        'transactions': transactions
    }

@app.route('/getTransactionsByATM', methods=['POST'])
def getTransactions():
    data = requests.get_json()
    atm_id = data.get('atm_id')
    transactions = atms.getTransactions(atm_id)
    return {
        'status': 200,
        'transactions': transactions
    }

@app.route('/getFraudulentTransactions', methods=['POST'])
def getFraudulentTransactions():
    data = requests.get_json()
    user_id = data.get('user_id')
    fraudulent_transactions = atms.getFraudulentTransactions(user_id)
    return {
        'status': 200,
        'fraudulent_transactions': fraudulent_transactions
    }


if __name__ == '__main__':
    app.run(debug=True)