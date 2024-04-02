from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, jsonify
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
        return jsonify({
            "isSuccess": True,
            "code": 1000,
            "message": "회원 정보가 있습니다."
        })
    else:
        return jsonify({
            "isSuccess": False,
            "code": 1001,
            "message": "회원 정보가 없습니다."
        })


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':

        user_info = request.get_json()

        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()
        cursor.execute("UPDATE member SET gender=?, height=?, weight=?, age=?, loggedIn=? WHERE id=?",
                       (user_info['gender'], user_info['height'], user_info['weight'], user_info['age'], 1, id))
        conn.commit()
        conn.close()

        return jsonify({
            "isSuccess": True,
            "code": 1000,
            "message": "회원 정보 등록에 성공했습니다.",
            "result": "회원 id:" + id + "등록에 성공했습니다."
        })


if __name__ == '__main__':
    app.run('0.0.0.0', port=8888, debug=True)