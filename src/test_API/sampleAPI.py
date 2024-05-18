from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load the comments from the JSON file
with open('TestComments.json', 'r') as f:
    comments = json.load(f)

@app.route('/tumblrAI', methods=['POST'])
def get_comment():
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
