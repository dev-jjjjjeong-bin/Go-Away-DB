import sqlite3


def get_user_id(path):
    conn = sqlite3.connect(path)
    cursor = conn.cursor()

    cursor.execute("select id from member")
    rows = cursor.fetchall()
    conn.close()
    return int(rows[0][0])