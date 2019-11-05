#ifndef I3_CONFIG_H
#define I3_CONFIG_H
#endif

// I3 connection details
// see paho mqtt API documentation for connection options and details
#define I3_MQTT_KEEP_ALIVE_INTERVAL     20
#define I3_MQTT_CLEAN_SESSION           1
#define I3_MQTT_QUALITY_OF_SERVICE      1      
#define I3_MQTT_RETAIN                  0
#define I3_MQTT_TIMEOUT                 10000L

#undef I3_CONFIG_H