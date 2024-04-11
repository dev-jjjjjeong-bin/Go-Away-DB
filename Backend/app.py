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


@app.route('/todo', methods=['GET'])
def todo():
    if request.method == 'GET':
        query_date = request.args.get('date')

        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()

        cursor.execute("SELECT content FROM todos WHERE date = ?", (query_date,))
        todos = cursor.fetchall()

        conn.close()

        todos_list = [todo[0] for todo in todos]
        return jsonify(todos_list)


@app.route('/todo/complete', methods=['GET'])
def todo_complete():
    if request.method == 'GET':
        query_date = request.args.get('date')

        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM todos WHERE date = ?", (query_date,))
        todos_ids = cursor.fetchall()

        if not todos_ids:
            return jsonify({'error': 'No todos found for the specified date', 'isCompleted': False}), 404

        all_completed = True
        for todo_id in todos_ids:
            cursor.execute("SELECT COUNT(*) FROM todo_contents WHERE todo_id = ? AND is_completed = 0", (todo_id[0],))
            count_not_completed = cursor.fetchone()[0]
            if count_not_completed > 0:
                all_completed = False
                break

        conn.close()
        return jsonify({'date': query_date, 'isCompleted': all_completed})


@app.route('/todo/add/<part>', methods=['POST'])
def add_todo(part):
    if request.method == 'POST':
        conn = sqlite3.connect('python.db')
        cursor = conn.cursor()

        if part in ["어깨", "등", "가슴", "복부", "하체"]:
            cursor.execute("INSERT INTO todo_contents VALUES (?, ?, ?, ?)", ())
            conn.commit()
            conn.close()
            return jsonify("")


if __name__ == '__main__':
    app.run('0.0.0.0', port=8888, debug=True)