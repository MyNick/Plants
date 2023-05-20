import time
import getpass
import serial
from plants.db import get_all

#if getpass.getuser() == 'itago':
#    s = serial.Serial('/dev/tty.usbserial-14440')
#else:
#    s = serial.Serial('/dev/ttyUSB0')
#print('sleep')
#time.sleep(5)
#print('slept')


for p in get_all():
    if p.nextWatering > time.time():
        continue
    print(f'watering {p.name} for {p.wateringDuration / 1000} seconds')
    #a.write(f'2 {p.arduinoPin} {p.wateringDuration}\n'.encode())
    track(p)
    p.calculate_next_watering()
    put(p)
