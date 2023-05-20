import boto3
import time
from decimal import Decimal
from functools import lru_cache
from plants.model import Plant


@lru_cache
def watering_table():
    return boto3.resource('dynamodb', region_name='eu-central-1').Table('PlantsWateringTable')


@lru_cache
def history_table():
    return boto3.resource('dynamodb', region_name='eu-central-1').Table('WateringHistory')


def get_all():
    response = watering_table().scan()
    assert response.get('LastEvaluatedKey') is None
    plants = [Plant.from_dict(d) for d in response['Items']]
    plants.sort(key=lambda p: p.id)
    return plants


def get(plant_id: str) -> Plant:
    return Plant.from_dict(watering_table().get_item(Key={'id': int(plant_id)})['Item'])


def to_dynamodb_dict(d) -> None:
    for k, v in d.items():
        if isinstance(v, float):
            d[k] = Decimal(v)


def put(plant) -> None:
    d = plant.to_dict()
    to_dynamodb_dict(d)
    watering_table().put_item(Item=d)


def track(plant) -> None:
    """
    Add plant to history table
    """
    d = plant.to_dict()
    d['time'] = time.time()
    to_dynamodb_dict(d)
    history_table().put_item(Item=d)
