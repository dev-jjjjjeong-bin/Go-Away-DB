from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from utils.utils import get_user_id
import sqlite3

app = Flask(__name__)
app.secret_key = 'nam'

user_info = {
    "gender": "0",
    "age": "0",
    "height": "0",
    "weight": "0"
}

global id
id = get_user_id('python.db')

@app.route('/')
def main():
    conn = sqlite3.connect('python.db')
    cursor = conn.cursor()

    cursor.execute("SELECT loggedin FROM member where id = ?", (id, ))
    rows = cursor.fetchall()

    conn.close()

    if str(rows[0][0]) == "1":
        return render_template('main.html')
    else:
        return render_template('gender_form.html')


@app.route('/logout', methods=['GET'])
def logout():
    if request.method == "GET":
        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()

        cursor.execute("DELETE FROM member")
        cursor.execute("INSERT INTO member (id, gender, height, weight, age, loggedIn) VALUES (?, ?, ?, ?, ?, ?)", (id, 0, 0, 0, 0, 0))
        conn.commit()
        conn.close()

        return render_template('before_register.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('submit_spec.html')
    elif request.method == 'POST':
        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()
        cursor.execute("UPDATE member SET gender=?, height=?, weight=?, age=?, loggedIn=? WHERE id=?",
                       (user_info['gender'], user_info['height'], user_info['weight'], user_info['age'], 1, id))
        conn.commit()
        conn.close()
        return render_template("main.html")


@app.route('/register/gender', methods=['GET', 'POST'])
def gender():
    if request.method == 'GET':
        return render_template('gender_form.html')
    elif request.method == 'POST':
        user_info['gender'] = request.form['gender']
        return render_template("age_form.html")


@app.route('/register/age', methods=['GET', 'POST'])
def age():
    if request.method == 'GET':
        return render_template('age_form.html')
    elif request.method == 'POST':
        user_info['age'] = request.form['age']
        return render_template("body_form.html")


@app.route('/register/body', methods=['GET', 'POST'])
def body():
    if request.method == 'GET':
        return render_template('body_form.html')
    elif request.method == 'POST':
        user_info['height'] = request.form['height']
        user_info['weight'] = request.form['weight']
        return render_template("submit_spec.html")


@app.route('/info_edit', methods=['GET', 'POST'])
def info_edit():
    if request.method == 'GET':
        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()
        cursor.execute("SELECT gender, age, height, weight FROM member WHERE id = ?", (id, ))
        already_info = cursor.fetchone()

        return render_template('info_edit.html', already_info=already_info)
    elif request.method == 'POST':
        edit_info = {
            "gender": request.form['gender'],
            "age": request.form['age'],
            "height": request.form['height'],
            "weight": request.form['weight']
        }
        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()
        cursor.execute("UPDATE member SET gender=?, height=?, weight=?, age=? WHERE id=?",
                       (edit_info['gender'], edit_info['height'], edit_info['weight'], edit_info['age'], id))
        conn.commit()
        conn.close()
        return render_template("main.html")


if __name__ == '__main__':
    app.run('0.0.0.0', port=8888, debug=True)