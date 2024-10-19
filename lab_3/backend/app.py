from flask import Flask, jsonify, send_from_directory,make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import os
import sys
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)

# Конфигурация базы данных
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://user:password@db:5432/mydatabase')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Модель для видео
class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_src = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    channel_name = db.Column(db.String, nullable=False)
    channel_icon = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Video {self.title}>'

@app.route('/api/status', methods=['GET'])
def get_db_status():
    try:
        db.session.execute(text('SELECT 1'))
        result = db.session.execute(text('SELECT * FROM videos')).fetchall()
        video_list = [{
            'id': row[0],
            'video_src': row[1],
            'title': row[2],
            'channel_name': row[3],
            'channel_icon': row[4],
            'description': row[5]
        } for row in result]

        return jsonify({
            "status": "Database connection successful",
            "videos": video_list
        }), 200
    except Exception as e:
        return jsonify({
            "status": str(e),
            "error": str(e)
        }), 500

@app.route('/api/videos', methods=['GET'])
def get_videos():
    try:
        result = db.session.execute(text('SELECT * FROM videos')).fetchall()
        video_list = [{
            'id': row[0],
            'video_src': row[1],
            'title': row[2],
            'channel_name': row[3],
            'channel_icon': row[4],
            'description': row[5]
        } for row in result]
        return jsonify(video_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Swagger конфигурация
SWAGGER_URL = '/swagger'
API_URL = '/swagger.json'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Video API"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

@app.route('/swagger.json')
def swagger_json():
    response = make_response(send_from_directory('.', 'swagger.json'))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
