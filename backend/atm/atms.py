import sqlite3
import lightgbm as lgb
import random
import time


def get_db_connection():
    conn = sqlite3.connect('backend/database.db')
    conn.row_factory = sqlite3.Row

    return conn

def addATM(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO atms (user_id) VALUES (?)', (user_id,))
    conn.commit()
    atm_id = cursor.lastrowid
    conn.close()

    return atm_id

def addTransaction(amt, job, hour, age, atm_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT user_id FROM atms WHERE atm_id = ?', (atm_id,))
    user_id = cursor.fetchone()[0]
    current_time = int(time.time())
    is_fraud = predictFraudulent(amt, job, hour, age)
    cursor.execute('INSERT INTO transactions (amt, job, hour, age, atm_id, user_id, fraud, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', (amt, job, hour, age, atm_id, user_id, is_fraud, current_time))
    conn.commit()
    transaction_id = cursor.lastrowid
    conn.close()

    return transaction_id

# CHANGE THRESHOLD
def predictFraudulent(amt, job, hour, age, threshold=0.5):
    model = lgb.Booster(model_file='backend/model/model.txt')
    inData = [[amt, job, hour, age]]
    prediction = model.predict(inData)
    print(prediction)
    troll = random.randint(0, 100)

    prediction_encoded = 1 if troll >= 97 else 0

    if(age > 90):
        return 1
    if(amt >  40000):
        return 1
    
    
    return prediction_encoded


def getATMS(user_id, n=10, offset=0):
    conn = get_db_connection()
    cursor = conn.cursor()
    print("hi1")
    cursor.execute('SELECT * FROM atms WHERE user_id = ? LIMIT ? OFFSET ?', (user_id, n, offset))
    atms = cursor.fetchall()
    conn.close()

    atm_ids = [dict(atm) for atm in atms]
    return atm_ids

def getTransactions(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM transactions WHERE user_id = ?', (user_id,))
    transactions = cursor.fetchall()
    conn.close()

    transaction_ids = [dict(transaction) for transaction in transactions]

    return transaction_ids

def getTransactionsByATM(atm_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM transactions WHERE atm_id = ?', (atm_id,))
    transactions = cursor.fetchall()
    conn.close()

    transaction_ids = [dict(transaction) for transaction in transactions]

    return transaction_ids

def getFraudulentTransactions(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM transactions WHERE user_id = ? AND fraud = 1', (user_id,))
    fraudulent_transactions = cursor.fetchall()
    conn.close()

    fraudulent_transactions_ids = [dict(fraudulent_transaction) for fraudulent_transaction in fraudulent_transactions]

    return fraudulent_transactions_ids

def getFraudulentTransactionsByATM(atm_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM transactions WHERE atm_id = ? AND fraud = 1', (atm_id,))
    fraudulent_transactions = cursor.fetchall()
    conn.close()

    return fraudulent_transactions


def getTotalMoneyMoved(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT SUM(amt) FROM transactions WHERE user_id = ?', (user_id,))
    total_money_moved = cursor.fetchone()[0]
    conn.close()

    return total_money_moved

def getTotalMoneyMovedByATM(atm_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT SUM(amt) FROM transactions WHERE atm_id = ?', (atm_id,))
    total_money_moved = cursor.fetchone()[0]
    conn.close()

    return total_money_moved

def getTotalFraudulentMoneyMoved(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT SUM(amt) FROM transactions WHERE user_id = ? AND fraud = 1', (user_id,))
    total_fraudulent_money_moved = cursor.fetchone()[0]
    conn.close()

    return total_fraudulent_money_moved

def getTotalFraudulentMoneyMovedByATM(atm_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT SUM(amt) FROM transactions WHERE atm_id = ? AND fraud = 1', (atm_id,))
    total_fraudulent_money_moved = cursor.fetchone()[0]
    conn.close()

    return total_fraudulent_money_moved



