from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'nam'


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/login')
def login_form():
    return render_template('login_form.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register_form.html')
    elif request.method == 'POST':
        password = request.form['pwd']
        confirm_password = request.form['confirm_pwd']

        if password != confirm_password:
            flash("Passwords don't match")
            return redirect(url_for('register'))
        data = {
            'name': request.form['name'],
            'id': request.form['id'],
            'pwd': request.form['pwd'],
            'email': request.form['email'],
            'phone': request.form['phone'],
            'birth': request.form['birth'],
            'gender': request.form['gender']
        }
        return jsonify(data)


if __name__ == '__main__':
    app.run('0.0.0.0', port=8888, debug=True)
