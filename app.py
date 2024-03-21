from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start-game', methods=['GET'])
def start_game():
    # Example game logic for the beginning of the game
    return jsonify(message="You stand before a dark forest. What do you do?", choices=["Enter", "Camp outside", "Go back"])

if __name__ == '__main__':
    app.run(debug=True)
