def parseObjectList(filename):
    
    objectList = []
    
    with open(filename,'r') as objectFile:
        for line in objectFile.readlines():
            
            # Clean up the line
            for ch in ['[',']','(',')','\'']:
                if ch in line:
                    line = line.replace(ch,'')
            
            keys = line.split(',')
            # We are reading the object and id in order
            
            for i in range(len(keys)/2): 
                object = keys[i*2].strip()
                id = int(keys[i*2+1].strip())
                
                objectList.append((object, id))
    
    return objectList