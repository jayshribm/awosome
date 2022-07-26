from email import header
from flask import Flask, render_template, jsonify
from flask_cors import CORS
import socketio

app = Flask(__name__)
app.config["CORS_HEADERS"] = 'Content-Type'
CORS(app)

sio = socketio.Server(cors_allowed_origins='*', logger=True, async_mode=None)
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)
    sio.emit('get_data', {'data': 'A'})

@app.route('/', methods=['GET'])
def ping():
    # sio.emit('hello_world', {'data': 'B'})
    return jsonify({
        'ok': True,
        'data': {
            'message': "Alive!"
        }
        
    })


if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)
    socketio.run(app)
