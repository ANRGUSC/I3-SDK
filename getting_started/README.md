For version v0 :

For creating an account, product and even buying a product please follow the documentation at https://github.com/ANRGUSC/I3-SDK/blob/master/docs/I3_API_Documentation.pdf

Please modify the following script files to point at the I3 running instance along with the credentials.

1. test_pub.py - this is a publisher script written in python
2. test_sub.py - this is a subscriber script written in python
3. test_plot.py - this is to plot the data recieved.

The scripts writes into a configurable log file.

To test them you would need the folowing :
1. An I3 running instance (http://3.15.198.123:8000)

For test_pub :

2. Username of a seller who is publishing data, this is referred as account.
3. Password and topic of the seller who owns the data. The topic is manually created at the time of product creation and password is auto-generated only once the very 1st time a product is created.

For test_sub :

4. Username of a buyer who is publishing data, this is referred as account.
5. Password and topic of the buyer who subscribe the data. The topic is the product which is bought by the buyer and password is auto-generated only once the very 1st time a product is bought.

These are scripts that can subscribe and publish with  Transport Layer Security enabled,

1. test_tls_pub.py - publisher script written in python with TLS enabled.
2. test_tls_sub.py - subscriber script written in python with TLS enabled.

These script can be modified to use the appropriate TLS protocol. They are similar to the subscribe and publish scripts given above. 
