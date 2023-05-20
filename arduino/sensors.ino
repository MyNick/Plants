#define DEBUG 0
#define TOTAL_PUMPS 5
int PUMPS[] = {5, 6, 7, 8, 9};
#define SENSORS_VCC 2
#define TOTAL_SENSORS 8
int SENSORS[] = {A0, A1, A2, A3, A4, A5, A6, A7};

#define READ_SENSORS 1
#define ACTIVE_PUMP 2

void setup() {
  Serial.begin(9600);
  pinMode(SENSORS_VCC, OUTPUT);
  digitalWrite(SENSORS_VCC, LOW);
  for (int i = 0; i < TOTAL_PUMPS; ++i) {
    digitalWrite(PUMPS[i], HIGH);
    pinMode(PUMPS[i], OUTPUT);
  }
}

void loop() {
  if (Serial.available() > 0) {
    int command = Serial.parseInt();
    if (DEBUG) {
        Serial.println(String("Got command ") + String(command));
    }
    if (command == 0) {
      return;
    }
    if (command == READ_SENSORS) {
      digitalWrite(SENSORS_VCC, HIGH);
      delay(1000);
      for (int i = 0; i < TOTAL_SENSORS - 1; ++i) {
        Serial.print(analogRead(SENSORS[i]));
        Serial.print(' ');
      }
      Serial.println(analogRead(SENSORS[TOTAL_SENSORS - 1]));
      digitalWrite(SENSORS_VCC, LOW);
    } else if (command == ACTIVE_PUMP) {
      int pump = Serial.parseInt();
      int duration = Serial.parseInt();
      if (DEBUG) {
        Serial.println(String("Got pump ") + String(pump) + String(" and duration ") + String(duration));
      }
      digitalWrite(PUMPS[pump], LOW);
      delay(duration);
      digitalWrite(PUMPS[pump], HIGH);
      Serial.println(1);
    } else {
      Serial.println(-1);
    }
  }
}
