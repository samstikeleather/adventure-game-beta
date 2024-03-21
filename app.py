from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start-game', methods=['GET'])
def start_game():
    # Example game logic and choices
    return jsonify(message="You stand before a dark forest. Do you enter or camp?", choices=["Enter", "Camp"])

if __name__ == '__main__':
    app.run(debug=True)
