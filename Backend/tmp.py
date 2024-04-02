import sqlite3

conn = sqlite3.connect('python.db')
cursor = conn.cursor()
cursor.execute("select id from member")
rows = cursor.fetchall()
conn.close()
print(int(rows[0][0]))