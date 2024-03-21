from flask import Flask, render_template, jsonify, session
from flask_session import Session 

app = Flask(__name__)
app.secret_key = 'super secret key'  # Needed for session management
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add-to-inventory/<item>', methods=['GET'])
def add_to_inventory(item):
    if 'inventory' not in session:
        session['inventory'] = []
    session['inventory'].append(item)
    return jsonify(success=True, inventory=session['inventory'])

@app.route('/inventory', methods=['GET'])
def get_inventory():
    if 'inventory' not in session:
        session['inventory'] = []
    return jsonify(inventory=session['inventory'])

@app.route('/start-game', methods=['GET'])
def start_game():
    # Example game logic for the beginning of the game
    return jsonify(message="You stand before a dark forest. What do you do?", choices=["Enter", "Camp outside", "Go back"])

if __name__ == '__main__':
    app.run(debug=True)
