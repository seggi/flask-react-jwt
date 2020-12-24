from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, 
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity
)
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

app.config["JWT_SECRET_KEY"] = "strong-key"
jwt = JWTManager(app)


@app.route("/login", methods=['POST'])
def login():

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username:
        return jsonify({"msg": "Missing username "}), 400
    if not password:
        return jsonify({"msg": "Missing password "}), 400

    if username != "test-api" or password != "test-api":
        return jsonify({"msg": "Bad username or password"}), 400

    ret = {
        'accessToken': create_access_token(identity=username),
        "refreshToken": create_refresh_token(identity=username)
    }
    return jsonify(ret), 200


@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user =get_jwt_identity()
    ref = {
        'accessToken': create_access_token(identity=current_user)
    }
    return jsonify(ref), 200


@app.route("/protected", methods=["GET"])
@jwt_required
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route("/", methods=['GET', 'POST'])
def home():
    return jsonify(message="Welcome to Home Page")


if __name__ == "__main__":
    app.run(debug=True)

