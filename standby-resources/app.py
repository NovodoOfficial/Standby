from flask import Flask, render_template, jsonify
import json
import requests
import pyautogui
import socket

import os # temp

app = Flask(__name__)

def get_all_device_values(data, paths):
    result = {}
    for device in paths:
        result[device] = {}
        for subdevice in paths[device]:
            subdevice_id = paths[device][subdevice]
            entry = find_entry_by_id(data["Children"], subdevice_id)
            if entry:
                result[device][subdevice] = entry.get("Value", None)
            else:
                result[device][subdevice] = None
    return result

def find_entry_by_id(children, id_to_find):
    for entry in children:
        if entry.get("id") == id_to_find:
            return entry
        if "Children" in entry:
            found_entry = find_entry_by_id(entry["Children"], id_to_find)
            if found_entry:
                return found_entry
    return None

def load_json(file_path):
    with open(file_path, 'r', encoding="UTF-8") as file:
        return json.load(file)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/device-data')
def get_device_data():
    response = requests.get('http://127.0.0.1:8085/data.json')
    data = response.json()

    paths = load_json(os.path.join('standby-resources', 'paths.json'))
    result = get_all_device_values(data, paths)

    return jsonify(result)

@app.route('/playpause')
def play_pause():
    pyautogui.press('playpause')
    return "Toggled Play/Pause"

@app.route('/next')
def next_track():
    pyautogui.press('nexttrack')
    return "Next Track"

@app.route('/previous')
def previous_track():
    pyautogui.press('prevtrack')
    return "Previous Track"

@app.route('/volumeup')
def volume_up():
    for _ in range(5):
        pyautogui.press('volumeup')
    return "Volume Increased"

@app.route('/volumedown')
def volume_down():
    for _ in range(5):
        pyautogui.press('volumedown')
    return "Volume Decreased"

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        local_ip = s.getsockname()[0]
    except Exception:
        local_ip = '127.0.0.1'
    finally:
        s.close()
    return local_ip

if __name__ == '__main__':
    host_ip = get_local_ip()
    
    app.run(host=host_ip, port=49155)
