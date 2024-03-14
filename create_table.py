import sqlite3

conn = sqlite3.connect('python.db')
cursor = conn.cursor()


def insertDb():
    # cursor.execute('drop table member') # table 삭제 시 사용
    sql = """
        CREATE TABLE user (
            user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            role ENUM('role_user', 'role_admin', 'role_guest') NOT NULL,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password TEXT NOT NULL,
            phone VARCHAR(20),
            birth VARCHAR(6),
            gender VARCHAR(5),
            profile_img TEXT,
            user_status INT,
            introduce TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            nick_name VARCHAR(100),
            grade VARCHAR(20),
            height INT,
            weight INT
        );

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
