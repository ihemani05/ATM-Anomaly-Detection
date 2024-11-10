from atm import atms
from login import logins
from flask import Flask
from flask_cors import CORS
from flask import request


app = Flask(__name__)
CORS(app)


@app.route('/logIn', methods=['POST'])
def logIn():
    data = request.get_json()
    email,password = data.get('email'), data.get('password')
    user_id = logins.checkLogIn(email, password)
    return{
        'status': 200,
        'user_id': user_id
    }

@app.route('/signUp', methods=['POST'])
def signUp():
    data = request.get_json()
    email, password = data.get('email'), data.get('password')
    user_id = logins.signUp(email, password)
    return {
        'status': 200,
        'user_id': user_id
    }

@app.route('/addATM', methods=['POST'])
def addATM():
    data = request.get_json()
    user_id = data.get('user_id')
    atm_id = atms.addATM(user_id)

    return {
        'status': 200,
        'atm_id': atm_id
    }
# made by external front-end (not our main frontend)
@app.route('/addTransaction', methods=['POST'])
def addTransaction():
    data = request.get_json()
    print(data)
    print(type(data))
    atm_id = int(data['atm_id'])
    amt = float(data['amt'])
    job = int(data.get('job'))
    hour = int(data.get('hour'))
    age = int(data.get('age'))
    transaction_id = atms.addTransaction(amt, job, hour, age, atm_id)

    return{
        'status': 200,
        'transaction_id': transaction_id
    }

@app.route('/getATMS', methods=['POST'])
def getATMS():
    data = request.get_json()
    user_id = data.get('user_id')
    atm_ids = atms.getATMS(user_id)
    return{
        'status': 200,
        'atm_ids': atm_ids
    }

@app.route('/getTransactions', methods=['POST'])
def getTransactions():
    data = request.get_json()
    user_id = data.get('user_id')
    transaction_ids = atms.getTransactions(user_id)
    return {
        'status': 200,
        'transaction_ids': transaction_ids
    }

@app.route('/getTransactionsByATM', methods=['POST'])
def getTransactionsByATM():
    data = request.get_json()
    atm_id = data.get('atm_id')
    transaction_ids = atms.getTransactionsByATM(atm_id)
    return {
        'status': 200,
        'transaction_ids': transaction_ids
    }

@app.route('/getFraudulentTransactions', methods=['POST'])
def getFraudulentTransactions():
    data = request.get_json()
    user_id = data.get('user_id')
    fraudulent_transactions = atms.getFraudulentTransactions(user_id)
    return {
        'status': 200,
        'fraudulent_transactions': fraudulent_transactions
    }

@app.route('/getFraudulentTransactionsByATM', methods=['POST'])
def getFraudulentTransactionsByATM():
    data = request.get_json()
    atm_id = data.get('atm_id')
    fraudulent_transactions_ids = atms.getFraudulentTransactionsByATM(atm_id)
    return {
        'status': 200,
        'fraudulent_transactions_ids': fraudulent_transactions_ids
    }


@app.route('/getTotalMoneyMoved', methods=['POST'])
def getTotalMoneyMoved():
    data = request.get_json()
    user_id = data.get('user_id')
    total_money_moved = atms.getTotalMoneyMoved(user_id)
    return {
        'status': 200,
        'total_money_moved': total_money_moved
    }

@app.route('/getTotalMoneyMovedByATM', methods=['POST'])
def getTotalMoneyMovedByATM():
    data = request.get_json()
    atm_id = data.get('atm_id')
    total_money_moved = atms.getTotalMoneyMovedByATM(atm_id)
    return {
        'status': 200,
        'total_money_moved': total_money_moved
    }

@app.route('/getTotalFraudulentMoneyMoved', methods=['POST'])
def getTotalFraudulentMoneyMoved():
    data = request.get_json()
    user_id = data.get('user_id')
    total_fraudulent_money_moved = atms.getTotalFraudulentMoneyMoved(user_id)
    return {
        'status': 200,
        'total_fraudulent_money_moved': total_fraudulent_money_moved
    }

@app.route('/getTotalFraudulentMoneyMovedByATM', methods=['POST'])
def getTotalFraudulentMoneyMovedByATM():
    data = request.get_json()
    atm_id = data.get('atm_id')
    total_fraudulent_money_moved = atms.getTotalFraudulentMoneyMovedByATM(atm_id)
    return {
        'status': 200,
        'total_fraudulent_money_moved': total_fraudulent_money_moved
    }

if __name__ == '__main__':
    app.run(debug=True, port=8080)