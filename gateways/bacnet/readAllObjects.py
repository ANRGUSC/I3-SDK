import parser
import subprocess

gatewayAddr = '68.181.156.211'
gatewayObjectId = '52825'
BACpypesIniFile = '/usr/local/iotm/gateways/bacnet/BACpypes.ini'
objectListFile = 'objectList.json'

typesOfInterest = ['analogInput', 'analogOutput', 'analogValue', 'binaryInput', 'binaryOutput', 'binaryValue' ]
propertiesOfInterest = ['objectIdentifier', 'objectName', 'objectType', 'presentValue']

# Shell command to generate list of objects from gateways
objectListCmd = 'echo \'read ' + gatewayAddr + ' device ' + gatewayObjectId + ' objectList\' | python ReadProperty.py --ini=' + BACpypesIniFile + ' 1>'  + objectListFile
                    
# Generate JSON file with all objects
output = subprocess.check_output(['bash','-c', objectListCmd])

if output == '':
    
    # Read the file with all objects
    objectList = parser.parseObjectList(objectListFile)
    
    i = 0
    for object in objectList:
        
        if object[0] not in typesOfInterest:
            continue
        
        print "--- Object " + str(i) + ": "
        
        out_str = ""
        for property in propertiesOfInterest:
            
            readPropertyCmd = 'echo \'read ' + gatewayAddr + ' ' + object[0] + ' ' + str(object[1]) + ' ' + property + '\' | python ReadProperty.py --ini=' + BACpypesIniFile  
            output = subprocess.check_output(['bash','-c', readPropertyCmd])
            out_str = out_str + "," + output.replace('\n','')
            
        print out_str 

            