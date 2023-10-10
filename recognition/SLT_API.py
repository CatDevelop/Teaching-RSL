import argparse
import base64
import json
import os
import time
from collections import deque
from concurrent.futures import ThreadPoolExecutor
from queue import Queue
from threading import Thread
import cv2
import numpy as np
import socketio
from flask import Flask
from omegaconf import OmegaConf
from model import Predictor

os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

# Setting up the WebSocket server using Socket.IO
sio = socketio.Server(cors_allowed_origins="*", async_mode='threading')
app = Flask(__name__)
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

args = {
    "config_path": "static/config.json",
    "device": "cpu",
    "camera_id": 0,
    "sample_length": 32,
    "drawing_fps": 20,
    "inference_fps": 4,
    "openvino": False
}


# Create a deque to hold video frames with a maximum length of 32
frame_queue = deque(maxlen=32)
sign_res = []

room_id = 0

users = {}

model = ""


# def resize(im, new_shape=(224, 224)):
#     shape = im.shape[:2]
#     if isinstance(new_shape, int):
#         new_shape = (new_shape, new_shape)
#
#     r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])
#
#     new_unpad = int(round(shape[1] * r)), int(round(shape[0] * r))
#     dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]
#
#     dw /= 2
#     dh /= 2
#
#     if shape[::-1] != new_unpad:
#         im = cv2.resize(im, new_unpad, interpolation=cv2.INTER_LINEAR)
#     top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
#     left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
#     im = cv2.copyMakeBorder(im, top, bottom, left, right, cv2.BORDER_CONSTANT, value=(114, 114, 114))
#     return im


# Initialize the ML model with configuration
def init_model(config_path):
    try:
        with open('config.json', "r") as read_content:
            config = json.load(read_content)
    except FileNotFoundError:
        raise FileNotFoundError(f"Configuration file not found at path: {config_path}")
    except json.JSONDecodeError:
        raise ValueError(f"Error decoding the configuration file: {config_path}")

    try:
        cfg = OmegaConf.create(
            {
                "path_to_model": 'S3D.onnx',
                "path_to_class_list": 'RSL_class_list.txt',
                "threshold": 0.7,
                "topk": 1,
            }
        )
        model = Predictor(cfg)
        return model
    except KeyError as e:
        raise KeyError(f"Missing key in configuration file: {e}")
    except ValueError as e:
        raise ValueError(f"Error creating Predictor configuration: {e}")


# Function to perform model inference on video frames
def inference(model, frame_queue, result_queue, sid):
    global args, room_id, users

    last_sign_time = time.time()

    while True:
        if users[sid][3]:
            users.pop(sid, None)
            break

        cur_fps_time = time.time()

        if (time.time() - last_sign_time > 3 and len(sign_res) > 1) or len(sign_res) > 10:
            not_normalize_text = ' '.join(sign_res)

            print(not_normalize_text, sid)
            last_sign_time = time.time()
            sign_res.clear()

        if len(frame_queue) >= args["sample_length"]:
            cur_windows = list(frame_queue)
        else:
            continue

        model_time = time.time()
        results = model.predict(cur_windows)
        if results:
            result_queue.put(results)
            print(results)
            label = results['labels'][0]
            if label == 'он/она/оно/они':
                label = 'он'
            if label == 'вы/твой/ваш':
                label = 'вы'
            print(label)

            if label != 'нет жеста':
                if len(sign_res) == 0:
                    sign_res.append(label)
                    last_sign_time = time.time()
                    sio.emit("send_not_normalize_text", label, room=sid)
                elif sign_res[-1] != label:
                    sign_res.append(label)
                    last_sign_time = time.time()
                    sio.emit("send_not_normalize_text", label, room=sid)

            # last_sign_time = time.time()
        model_fps = 1 / (time.time() - cur_fps_time)


def main():
    global frame_queue, model
    model = init_model('config.json')
    # data = dict(img_shape=None, modality='RGB', label=-1)
    cam_disp = {'cam': None}

    # result_queue = Queue(maxsize=100)

    # pr = Thread(target=inference, args=(model, frame_queue, result_queue), daemon=True)
    # pr.start()

    # Use ThreadPoolExecutor to manage multiple concurrent tasks
    with ThreadPoolExecutor(max_workers=2) as executor:
        executor.submit(create_server)
        # executor.submit(inference, model, frame_queue, result_queue)

    while True:
        if cam_disp['cam'] is not None:
            cv2.imshow('cam', cam_disp['cam'])

        if cv2.waitKey(1) == ord('q'):
            break


# Socket.IO event handler: Client connects
@sio.event
def connect(sid, environ):
    global room_id, users, model
    print("Client connected:", sid)

    room_id = sid

    if sid not in users.keys():
        users[sid] = []
        users[sid].append(deque(maxlen=32))
        users[sid].append(Queue(maxsize=100))
        users[sid].append(Thread(target=inference, args=(model, users[sid][0], users[sid][1], sid), daemon=True))
        users[sid].append(False)
        users[sid][2].start()
    print(users)


@sio.event
def disconnect(sid):
    global room_id, users, model
    print("Disconnected:", sid)
    users[sid][0].clear()
    users[sid][3] = True
    print(users)


# Socket.IO event handler: Received video frame data from the client
@sio.on("data")
def data(sid, data):
    global frame_queue, users
    image_data = data.split(",")[1]
    image_bytes = base64.b64decode(image_data)
    frame = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(frame, -1)
    users[sid][0].append(np.array(image[:, :, ::-1]))
    print(sid)
    # frame_queue.append(np.array(resize(image, (224, 224))[:, :, ::-1]))


# Function to create the WebSocket server
def create_server():
    app.run()


if __name__ == '__main__':
    main()
