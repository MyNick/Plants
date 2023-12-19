import time
import getpass
import serial
import logging
from plants.db import get_all, track, put

format_ = "|%(levelname)-9s|%(asctime)s|%(message)s"
logging.basicConfig(
    format=format_,
    datefmt="%H:%M:%S",
    level=logging.INFO
)
logger = logging.getLogger(__name__)

if getpass.getuser() == 'itago':
    s = serial.Serial('/dev/tty.usbserial-14440')
else:
    s = serial.Serial('/dev/ttyUSB0')
logger.info('sleep')
time.sleep(5)
logger.info('slept')


for p in get_all():
    if p.nextWatering > time.time():
        continue
    try:
        logger.info(f'watering {p.name} for {p.wateringDuration / 1000} seconds')
        s.write(f'2 {int(p.arduinoPin)} {int(p.wateringDuration)}\n'.encode())
        time.sleep(p.wateringDuration / 1000 + 500)
        logger.info(s.readline())
        track(p)
        p.lastWatering = time.time()
        p.calculate_next_watering()
        put(p)
    except:
        logger.exception(f'exception on {p.name}')
