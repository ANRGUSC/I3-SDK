# I3 v0 SDK

This Software Development Kit provides sample scripts that can be used by publishers and subscribers on the I3 real-time IoT data marketplace for smart communities.

For more information on I3, please visit https://i3.usc.edu/

It is currently designed to show how to send data to and receive data from I3 v0. 

## To begin
Setup:
Step 1: install openssl
Step 2: clone this repository `git clone https://github.com/ANRGUSC/I3-SDK.git` 
Step 3: `cd I3-SDK`
Step 4: `cd deps/paho.mqtt.c`
Step 5: `git submodule update --init --recursive`

Configuring Publish Sample to Connect to I3:
Step 1: `cd samples/publish`
Step 2: open main.c in your preferred editor and enter your I3 account and topic informaiton exactly as is detailed in the comments

Configuring Subscribe Sample to Connect to I3:
Step 1: `cd samples/publish`
Step 2: open main.c in your preferred editor and enter your I3 account and topic informaiton exactly as is detailed in the comments

Building/Running Project (a sample):
Step 1: `mkdir cmake`
Step 2: `cd cmake`
Step 3: `cmake ..`
Step 4: `cd samples/sample_name`
Step 5: `make`
Step 6: `./sample_name`

## Contributors 
This I3 SDK has been initially developed by researchers at the Center for Cyber-Physical Systems and the Internet of Things, Viterbi School of Engineering, University of Southern California. 


