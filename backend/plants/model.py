from dataclasses import dataclass
from dataclasses_json import dataclass_json
from decimal import Decimal
from typing import Optional


@dataclass_json
@dataclass
class Plant:
    id: int
    name: str
    arduinoPin: int

    def __post_init__(self):
        for k, v in self.__dict__.items():
            if isinstance(v, Decimal):
                setattr(self, k, float(v))


@dataclass_json
@dataclass
class UpdatePlantRequest:
    id: int
    name: Optional[str] = None
    arduinoPin: Optional[str] = None



@dataclass_json
@dataclass
class ManualWaterRequest:
    id: int
    seconds: float