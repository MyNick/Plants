from dataclasses import dataclass
from dataclasses_json import dataclass_json
from decimal import Decimal


@dataclass_json
@dataclass
class Plant:
    id: int
    name: str
    lastWatering: float
    nextWatering: float
    wateringDuration: float
    wateringPeriod: float
    wateringPeriodUnits: str
    arduinoPin: int

    def __post_init__(self):
        for k, v in self.__dict__.items():
            if isinstance(v, Decimal):
                setattr(self, k, float(v))

    @property
    def period_units_in_seconds(self):
        assert self.wateringPeriodUnits == 'day'
        return 3600 * 24
    
    def calculate_next_watering(self):
        self.nextWatering = self.lastWatering + self.wateringPeriod * self.period_units_in_seconds


@dataclass_json
@dataclass
class UpdatePlantRequest:
    # server do the type check of the values to make sure they are floats
    id: int
    duration: str
    period: str
