from flask import Flask, render_template, jsonify, session
from flask_session import Session
from flask_cors import CORS
import json

app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
CORS(app)

# Load game data from JSON file
with open('game_data.json') as json_file:
    game_data = json.load(json_file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start-game', methods=['GET'])
def start_game():
    # Use the starting point from the game_data
    start_content = game_data['start_game']
    return jsonify(start_content)

@app.route('/choice/<choice_key>', methods=['GET'])
def handle_choice(choice_key):
    choice_content = game_data.get(choice_key)
    
    if choice_content:
        # If there's a specific action associated with the choice
        if 'action' in choice_content and choice_content['action'] == 'add_to_inventory':
            return add_to_inventory(choice_content.get('item'))
        return jsonify(choice_content)
    
    return jsonify({"message": "Choice not found."}), 404

@app.route('/inventory', methods=['GET'])
def get_inventory():
    if 'inventory' not in session:
        session['inventory'] = []
    return jsonify(inventory=session['inventory'])

@app.route('/add-to-inventory/<item>', methods=['GET'])
def add_to_inventory(item):
    if 'inventory' not in session:
        session['inventory'] = []
    if item not in session['inventory']:
        session['inventory'].append(item)
    session.modified = True  # Ensure the change is saved
    return jsonify(success=True, inventory=session['inventory'])

@app.route('/remove-from-inventory/<item>', methods=['GET'])
def remove_from_inventory(item):
    if 'inventory' in session and item in session['inventory']:
        session['inventory'].remove(item)
        session.modified = True  # Ensure the change is saved
        return jsonify(success=True, inventory=session['inventory'])
    return jsonify(success=False, message="Item not found or no inventory"), 404

if __name__ == '__main__':
    app.run(debug=True)
