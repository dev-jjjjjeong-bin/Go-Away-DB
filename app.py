from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3

app = Flask(__name__)


@app.route('/main')
def main():
    return render_template('main.html')


@app.route('/login_form')
def login_form():
    return render_template('login_form.html')


@app.route('/login_proc', methods=['POST'])
def login_proc():
    userId = request.form['id']
    userPwd = request.form['pwd']

    if len(userId) == 0 or len(userPwd) == 0:
        return userId + ', ' + userPwd + ' Login Data Not Found.'
    else:
        con = sqlite3.connect('python.db')
        cursor = con.cursor()
        sql = "select idx, userId, userPwd, userEmail from member where userId = ?"
        cursor.execute(sql, (userId, ))
        rows = cursor.fetchall()
        for row in rows:
            print(row)
            if userId == row[1] and userPwd == row[2]:
                session['logFlag'] = True
                session['idx'] = row[0]
                session['userId'] = userId

                return redirect(url_for('main'))
            else:
                return redirect(url_for('login_form'))


app.secret_key = 'sample_secret_key'

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
