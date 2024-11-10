import sqlite3

# Define the database filename
def get_db_connection():
    conn = sqlite3.connect('backend/database.db')
    conn.row_factory = sqlite3.Row
    return conn

def checkLogIn(email, password):
    conn = get_db_connection()
    #if connection is true, will do this 
    if conn is not None:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT user_id, password FROM users WHERE email = ?", (email,))
            row = cursor.fetchone()
            #if there is a row of data with that email
            if row:
                user_id, stored_password = row
                #if the password entered matches the password that is inputted
                if password == stored_password:
                    return user_id
                #if they dont enter the correct password
                else:
                    return -1
            #if the attempted email does not exist in the database
            else:
                return -1
            
        except sqlite3.Error as e:
            return -1
        #end the connection no matter what
        finally:
            conn.close()
    #only runs if connection is not true 
    else:
        return -1

def signUp(email, password):
    conn = get_db_connection()
    #will return true as long as the connection works
    if conn is not None:
        try:
            cursor = conn.cursor()
            # Check if the user already exists
            cursor.execute("SELECT user_id FROM users WHERE email = ?", (email,))
            result = cursor.fetchone()
            #if the user already exists 
            if result:
                print("user is found")
                user_id = result[0] 
                # Attempt to log in
                login_result = checkLogIn(email, password)
                if login_result:
                    # Login successful
                    return login_result
                else:
                    # Login failed
                    return -1
            else:
                # Insert the new user
                print("user is being inserted")
                cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password))
                conn.commit()
                user_id = cursor.lastrowid
                return user_id
        except sqlite3.Error as e:
            print("sqlite error: " + str(e))
            return -1
        finally:
            conn.close()
    #this runs if the connection does not work
    else:
        print("connection to DB failed")
        return -1

