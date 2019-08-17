LA daily forecast for the week
The National Weather Service (NWS) API allows developers access to critrical forecasts, alerts, and observations, along with other weather data.

https://www.weather.gov/documentation/services-web-api

Format : json

Refresh Rate : daily

Source :  https://api.weather.gov/gridpoints/LOX/154,44/forecast

Contains the following columns : 
1. Start Time
2. End Time
3. isDaytime
4. temperature
5. temperatureUnit
6. temperatureTrend
7. windSpeed
8. windDirection
9. shortForecast
10. detailedForecast.

Sample data : https://anrgusc.github.io/I3-SDK/lametrostop_sample.json


Note : That this is sample publisher and subscriber written fetch data.
The following modules are required as well as python version 3 
* json
* requests
* paho-mqtt

