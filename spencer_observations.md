# Observations on using test_pub.py and test_sub.py

**[test_pub.py](./getting_started/test_pub.py)**

- [clientId](./getting_started/test_pub.py#L58): not clear as to whether or not this is generated or user-defined
- [print()](./getting_started/test_pub.py#L69): version for python3
- [pub_client.on_connect = on_connect](./getting_started/test_pub.py#L79): debug when callback does not get called
- [pub_client.publish()](./getting_started/test_pub.py#L96): log for when this does not work

**[test_sub.py](./getting_started/test_sub.py)**

- [topic](./getting_started/test_sub.py#L42): note that [pub_client.subscribe(topics)](./getting_started/test_pub.py#L96): takes topic as str, not vector. (currently mimicking publish)

**[API Documentation](.docs/I3_API_Documentation.pdf)**

- no reference to clientId
- link to publish.py script is outdated (--> test_sub.py)

**General**

- should be able to start up sdk from readme only
- Readme for getting started should be in root. or at least a link from main readme to
- move all user information to [config.ini](./getting_started/config.ini)
- do not know why my program is not working. need logs to trace my problem. 
- APIs?
- why do test scripts live in two places (getting_started/ and docs/mqtt_scripts/)