import json
import logging
import time
import serial
from datetime import datetime
from decimal import Decimal
from enum import Enum
from flask import Flask, request
from flask_cors import CORS

from plants.db import get, get_all, put, track
from plants.model import Plant, UpdatePlantRequest, ManualWaterRequest

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)


@app.route('/plants')
def all_plants():
    return json.dumps({
        'plants': [p.to_dict() for p in get_all()]
    })


@app.route('/plant', methods=['PUT'])
def update_plant():
    params = UpdatePlantRequest.from_dict(request.json)
    plant = get(params.id)
    if params.name is not None:
        plant.name = params.name
    if params.arduinoPin is not None:
        plant.arduinoPin = params.arduinoPin
    put(plant)
    return ''


@app.route('/plant/<plant_id>/water', methods=['POST'])
def on_demand_water(plant_id):
    params = ManualWaterRequest.from_dict(request.json)
    plant = get(params.id)
    logger.info(f'watering {plant.name} for {params.seconds} seconds')
    s = serial.Serial('/dev/ttyUSB0')
    s.write(f'2 {int(plant.arduinoPin)} {int(params.seconds * 1000)}\n'.encode())
    time.sleep(params.seconds + 1)
    logger.info(f'result - {s.readline()}')
    track(plant)
    return ''