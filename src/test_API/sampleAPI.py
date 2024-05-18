from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the comments from the JSON file
with open('TestComments.json', 'r') as f:
    comments = json.load(f)

@app.route('/tumblrAI', methods=['POST', 'OPTIONS'])
def get_comment():
    if request.method == 'OPTIONS':
        # Allows the GET, POST, and OPTIONS methods from any origin
        response = app.make_default_options_response()
        headers = request.headers.get('Access-Control-Request-Headers', '')
        response.headers.add("Access-Control-Allow-Headers", headers)
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    
    data = request.get_json()

    if not data or 'selectedTone' not in data:
        return jsonify({"error": "Invalid request"}), 400

    selected_tone = data['selectedTone'].lower()

    if selected_tone in comments:
        response = {
            "comment": comments[selected_tone]
        }
        return jsonify(response)
    else:
        return jsonify({"error": "Tone not found"}), 404

if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
