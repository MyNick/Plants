import boto3
import json
import logging
import time
from datetime import datetime
from decimal import Decimal
from enum import Enum
from functools import lru_cache
from flask import Flask, request
from flask_cors import CORS

from .model import Plant, UpdatePlantRequest

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)


@lru_cache
def watering_table():
    return boto3.resource('dynamodb', region_name='eu-central-1').Table('PlantsWateringTable')


def get(plant_id: str) -> Plant:
    return Plant.from_dict(watering_table().get_item(Key={'id': int(plant_id)})['Item'])


def put(plant) -> None:
    d = plant.to_dict()
    for k, v in d.items():
        if isinstance(v, float):
            d[k] = Decimal(v)
    return watering_table().put_item(Item=d)


@app.route('/plants')
def all_plants():
    response = watering_table().scan()
    assert response.get('LastEvaluatedKey') is None
    plants = [Plant.from_dict(d).to_dict() for d in response['Items']]
    plants.sort(key=lambda p: p['id'])
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
    print(plant.nextWatering)
    plant.nextWatering = time.time()
    print(plant.nextWatering)
    put(plant)
    return ''
