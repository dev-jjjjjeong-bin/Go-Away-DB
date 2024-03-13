import sqlite3

conn = sqlite3.connect('python.db')
cursor = conn.cursor()


def insertDb():
    # cursor.execute('drop table member') # table 삭제 시 사용
    sql = """
        create table member(
            idx integer primary key autoincrement,
            userId text not null,
            userPwd text not null,
            userEmail text,
            regDate default(datetime('now', 'localtime')))
    """
    cursor.execute(sql)


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
