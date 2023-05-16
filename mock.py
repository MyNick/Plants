import json
import logging
import time
from dataclasses import dataclass
from dataclasses_json import dataclass_json
from datetime import datetime
from decimal import Decimal
from enum import Enum
from flask import Flask, request
from flask_cors import CORS

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)


@dataclass_json
@dataclass
class Plant:
    name: str
    lastWatering: float
    wateringTime: float
    wateringPeriod: float
    wateringPeriod_units: str


@app.route('/plants')
def all_plants():
    return json.dumps({
        'plants': [
            Plant('Marva', time.time(), 3000, 6, 'day').to_dict(),
            Plant('Bazilikum', time.time() - 3600, 1000, 0.5, 'day').to_dict(),
            Plant('Nana', time.time() - 3600 * 2, 3000, 1, 'day').to_dict(),
            Plant('Rozmarin', time.time() - 3600 * 3, 5000, 7, 'day').to_dict(),
            Plant('Timin', time.time() - 3600 * 4, 3000, 2, 'day').to_dict(),
        ]
    })
