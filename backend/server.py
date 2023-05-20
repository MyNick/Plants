import json
import logging
import time
from datetime import datetime
from decimal import Decimal
from enum import Enum
from flask import Flask, request
from flask_cors import CORS

from plants.db import get, get_all, put
from plants.model import Plant, UpdatePlantRequest

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)


@app.route('/plants')
def all_plants():
    plants = [p.to_dict() for p in get_all()]
    return json.dumps({
        'plants': plants
    })


@app.route('/plant', methods=['PUT'])
def update_plant():
    params = UpdatePlantRequest.from_dict(request.json)
    plant = get(params.id)
    plant.wateringDuration = float(params.duration)
    plant.wateringPeriod = float(params.period)
    plant.calculate_next_watering()
    put(plant)
    return ''


@app.route('/water/<plant_id>', methods=['POST'])
def on_demand_water(plant_id):
    t = watering_table()
    plant = get(plant_id)
    plant.nextWatering = time.time()
    put(plant)
    return ''
