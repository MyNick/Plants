import time
import serial
#a = serial.Serial('/dev/ttyUSB0')
a = serial.Serial('/dev/tty.usbserial-14440')
print('sleep')
time.sleep(5)
print('slept')
for i in range(5):
    a.write(f'2 {i} 1000\n'.encode())
    print(f'wrote to {i}')
    time.sleep(1)
    print(a.readline())
