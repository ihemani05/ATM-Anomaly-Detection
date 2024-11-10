import sqlite3

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

def addTransaction(atm_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO transactions (atm_id) VALUES (?)', (atm_id,))
    conn.commit()
    transaction_id = cursor.lastrowid
    conn.close()

    # if(predictFraud(transaction)):
    #     createAlert(transaction_id)
    
    return transaction_id

def createAlert(transaction_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO alerts (transaction_id) VALUES (?)', (transaction_id,))
    conn.commit()
    alert_id = cursor.lastrowid
    conn.close()
    return alert_id