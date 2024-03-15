from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'nam'


@app.route('/')
def main():
    conn = sqlite3.connect('python.db')
    cursor = conn.cursor()

    cursor.execute("SELECT loggedin FROM member")
    rows = cursor.fetchall()

    conn.close()
    if str(rows[0][0]) == "1":
        return render_template('main.html')
    else:
        return render_template('before_register.html')


@app.route('/logout', methods=['GET'])
def logout():
    if request.method == "GET":
        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()

        cursor.execute("DELETE FROM member")
        conn.commit()
        conn.close()

        return render_template('before_register.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register_form.html')
    elif request.method == 'POST':
        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()

        data = {
            'gender': request.form['gender'],
            'height': request.form['height'],
            'weight': request.form['weight'],
            'age': request.form['age']
        }
        cursor.execute("INSERT INTO member (gender, height, weight, age, loggedIn) VALUES (?, ?, ?, ?, ?)",
                       (data['gender'], data['height'], data['weight'], data['age'], True))
        conn.commit()
        conn.close()
        return render_template("main.html")


if __name__ == '__main__':
    app.run('0.0.0.0', port=8888, debug=True)
