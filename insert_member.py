import sqlite3

conn = sqlite3.connect('python.db')
cursor = conn.cursor()

def insertDb():
    try:
        # cursor.execute('drop table member') # table 삭제 시 사용
        sql = """
            insert into member(userId, userPwd, userEmail)
            values('hong1', '1234', 'hong1@')
        """
        cursor.execute(sql)
        conn.commit()  # Commit the transaction
    except sqlite3.Error as e:
        print("Error occurred:", e)

def readDb():
    cursor.execute("select * from member")
    rows = cursor.fetchall()
    for row in rows:
        print(row)

def main():
    insertDb()
    readDb()
    conn.close()

if __name__ == '__main__':
    main()
