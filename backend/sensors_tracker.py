import boto3
import serial
import time
cloudwatch = boto3.resource('cloudwatch')
a = serial.Serial('/dev/ttyUSB0')
#a = serial.Serial('/dev/tty.usbserial-14440')

def put_metric(name, value):
    for i in range(5):
        try:
            metric = cloudwatch.Metric('Plants', name)
            metric.put_data(
                Namespace='Plants',
                MetricData=[{
                    'MetricName': name,
                    'Value': value,
                    'Unit': 'Count',
                }]
            )
            return
        except BaseException as e:
            pass
    raise e


print('sleep')
time.sleep(5)
print(' -- done')
while True:
    msg = f'1 '.encode()
    assert a.write(msg) == len(msg)
    sensors = a.readline().decode().strip().split(' ')
    print(sensors[:5])
    for i, value in enumerate(sensors[:5]):
        put_metric(f'Sensor {i}', int(value))
    time.sleep(600)
    
