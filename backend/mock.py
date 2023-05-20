import json
import logging
import time
from datetime import datetime
from decimal import Decimal
from enum import Enum
from flask import Flask, request
from flask_cors import CORS

from plants.model import Plant, UpdatePlantRequest

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)


@app.route('/plants')
def all_plants():
    return json.dumps({
        'plants': [
            Plant(0, 'Marva', time.time(), time.time() + 100, 3000, 6, 'day', 0).to_dict(),
            Plant(1, 'Bazilikum', time.time() - 3600, time.time(), 1000, 0.5, 'day', 1).to_dict(),
            Plant(2, 'Nana', time.time() - 3600 * 2, time.time(), 3000, 1, 'day', 2).to_dict(),
            Plant(3, 'Rozmarin', time.time() - 3600 * 3, time.time(), 5000, 7, 'day', 3).to_dict(),
            Plant(4, 'Timin', time.time() - 3600 * 4, time.time(), 3000, 2, 'day', 4).to_dict(),
        ]
    })


@app.route('/plant', methods=['PUT'])
def update_plant():
    UpdatePlantRequest.from_dict(request.json())
    return 'success'


@app.route('/water/<plant_id>', methods=['POST'])
def on_demand_water(plant_id):
    return 'success'
