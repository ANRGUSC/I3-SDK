var map;


function addMarkers(map, devices, pinicon, description, logo, bigpic, clickable, productInfo, links){
        for(i=0;i<devices.length;i++){
        devices[i].marker = new google.maps.Marker({
                position: new google.maps.LatLng(devices[i].lat, devices[i].lng),
                visible: true,
                map: map,
                icon: pinicon,
                draggable: true,
                });
        devices[i].window = new google.maps.InfoWindow({disableAutoPan:true});
            
        var content = 'lat: '+devices[i].lat+', lng: '+devices[i].lng;
            
         /*
           
        google.maps.event.addListener(devices[i].marker, 'click', (function (content, infoWindow) {
                    
                    return function () { 
                                         infoWindow.setContent('{lat: '+this.getPosition().lat()+', lng: '+this.getPosition().lng()+'}');
                                         infoWindow.open(map,this);}
                    
                })(content, devices[i].window));   
          */  
           
        
        google.maps.event.addListener(devices[i].marker, 'mouseover', (function (content, infoWindow) {
                return function () {
                                     info = '<img src="'+logo+'" alt="logo"><h4 style="text-align: center;">'+description+'</h4>';
                                     infoWindow.setContent(info);
                                     infoWindow.open(map,this);}
            })(content, devices[i].window));  
            
        if(clickable){
            google.maps.event.addListener(devices[i].marker, 'click', (function (content, infoWindow) {
                    var picture = '<img src="'+bigpic+'" alt="logo">';
                    var heading = description;
                    var info = "Description of product";
                    return function () { displayInfo(picture,heading,productInfo,links);
                                         infoWindow.open(map,this);}
                })(content, devices[i].window));
        } 
            
        
        google.maps.event.addListener(devices[i].marker, 'mouseout', (function (infoWindow) {
                return function () { 
                                     infoWindow.close();}
            })(devices[i].window));  
            
    }
}



function loadMap(mapSpec){
    if(mapSpec == maps.city){
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: mapSpec.zoom,
          center: mapSpec.center,
          styles: mapStyle,
        });
    }
    
    else{
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: mapSpec.zoom,
          center: mapSpec.center,
          styles: locStyle,
        });
    }
    
    var devices;
    var pinicon;
    var description;
    var logo;
    var bigpic;
    var clickable;
    var productInfo = '';
    var links = '';
    
    
    if(mapSpec == maps.uscTemperature){
        for(i=0; i<temperature.length; i++){
            clickable = true;
            bigpic = 'images/humTemp.png';
            logo = 'images/humTemp_logo.png';
            pinicon =  'images/temp_humid.png';
            description = 'Temperature/Humidity';
            productInfo = products.temperature.description;
            links = products.temperature.links;
            devices = mapSpec.devices[i];
            addMarkers(map,devices,pinicon,description,logo,bigpic,clickable,productInfo,links);
        }
    }
    
    
    else if(mapSpec == maps.uscLoRa){

            console.log('lora');
            clickable = true;
            bigpic = 'images/LoRa.jpg';
            logo = 'images/LoRaSensor.png';
            pinicon =  'images/lora_sensor.png';
            description = 'USC LoRa Gateway';
            productInfo = products.LoRa.description;
            links = products.LoRa.links;
            devices = maps.uscLoRa.devices;
            addMarkers(map,devices,pinicon,description,logo,bigpic,clickable,productInfo,links);

    }
    
    
    else if(mapSpec == maps.citySeismic){
        for(i=0; i<seismic.length; i++){
            clickable = true;
            bigpic = 'images/seismic_sensors.jpg';
            logo = 'images/seismic_0.png';
            pinicon =  'images/seismic.png';
            description = 'Seismic Sensors';
            productInfo = products.seismic.description;
            links = products.seismic.links;
            devices = mapSpec.devices[i];
            addMarkers(map,devices,pinicon,description,logo,bigpic,clickable,productInfo,links);
        }
    }
       
    
    else Object.keys(mapSpec.devices).map(function(objectKey, index) {
        clickable = false;
        
        if(objectKey == "sensors"){
            clickable = true;
            bigpic = 'images/cci_sensors.png';
            logo = 'images/CCI.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 5,
			    //fillColor: '#891630',
                fillColor: 'yellow',
			    fillOpacity: .5,
			    strokeColor: '#891630',
			    strokeOpacity: .7,
			    strokeWeight: 1
            };
            description = 'CCI IoT Testbed';
            productInfo = products.cci.description;
            links = products.cci.links;
        }
        else if(objectKey == "networks"){
            clickable = true;
            bigpic = 'images/TutornetLayout.jpg';
            logo = "images/anrgLogo.png";
            pinicon = "images/network.png";
            description = 'Tutornet';
            productInfo = products.tutornet.description;
            links = products.tutornet.links;
        }
        else if(objectKey == "beacons"){
            bigpic = 'images/ble2.png';
            logo = 'images/physical_web.png';
            pinicon =  {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5,
                    fillColor: '#0e71ec',
                    fillOpacity: .5,
                    strokeColor: '#649e9f',
                    strokeOpacity: .7,
                    strokeWeight: 1,
                    
                };
            description = 'BLE Beacon';
        }
        else if(objectKey == "cameras"){
            bigpic = 'images/Surveillance.jpg';
            logo = 'images/camera.jpeg';
            pinicon =  {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    fillColor: 'black',
                    fillOpacity: .5,
                    strokeColor: 'black',
                    strokeOpacity: .7,
                    strokeWeight: 1
                }; 
            description = 'Camera';
        }
        else if(objectKey == "vehicles"){
            bigpic = 'images/dps.jpg';
            logo = "images/usc_logo.png";
            pinicon = "images/cart.png";
            description = 'Facilities Management<br>Serivces Vehicle';
        }
        else if(objectKey == "smartphones"){
            clickable = true;
            bigpic = 'images/smartphone-sensors.jpg';
            logo = "images/smartphone_sensors.png";
            pinicon = "images/smartphone_0.png";
            description = 'Smartphone Sensors';
            productInfo = products.smartphone.description;
            links = products.smartphone.links;
        }
        else if(objectKey == "bacnet"){
            clickable = true;
            bigpic = 'images/bacnet.jpg';
            logo = 'images/bacnet.png';
            pinicon =  {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5,
                    fillColor: '#909188',
                    fillOpacity: .4,
                    strokeColor: '#909188',
                    strokeOpacity: .7,
                    strokeWeight: 2
                }; 
            description = 'BACnet';
            productInfo = products.bacnet.description;
            links = products.bacnet.links;
        }
        
        else if(objectKey == "roadClosures"){
            clickable = false;
            logo = 'images/road_closure.png';
            pinicon = "images/traffic_inc.png";
            description = 'Road Closure';
        }
        else if(objectKey == "police"){
            clickable = true;
            bigpic = 'images/LAPD_1.jpeg';
            logo = 'images/LAcity.jpeg';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 5,
			    fillColor: '#171689',
			    fillOpacity: .5,
			    strokeColor: '#171689',
			    strokeOpacity: .8,
			    strokeWeight: 1
            };
            description = 'Crime Reports';
            productInfo = products.police.description;
            links = products.police.links;
        } 
        else if(objectKey == "aqi"){
            clickable = true;
            bigpic = 'images/aqi_big.png';
            logo = 'images/aqi.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 5,
			    fillColor: '#58ee3b',
			    fillOpacity: .5,
			    strokeColor: '#58ee3b',
			    strokeOpacity: 1,
			    strokeWeight: 1
            };
            description = 'Air Quality'
            productInfo = products.aqi.description;
            links = products.aqi.links;
        }
        else if(objectKey == "cleanStreets"){
            logo = 'images/cleanstreets.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 5,
			    fillColor: '#267e1f',
			    fillOpacity: .5,
			    strokeColor: '#267e1f',
			    strokeOpacity: 1,
			    strokeWeight: 1
            };
            description = 'USC/IMSC Clean Streets Project';
        }
        
        else if(objectKey == "trafficSensors"){
            clickable = false;
            logo = 'images/traffic.jpeg';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 4,
			    fillColor: 'purple',
			    fillOpacity: .6,
			    strokeColor: 'purple',
			    strokeOpacity: .7,
			    strokeWeight: 1
            };
            description = 'Traffic Sensor';
        }
        else if(objectKey == "buildingSensor"){
            clickable = false;
            logo = 'images/buildingSensor.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 4,
			    fillColor: '#7fa5e0',
			    fillOpacity: .4,
			    strokeColor: '#7fa5e0',
			    strokeOpacity: .7,
			    strokeWeight: 1
            };
            description = 'Building Sensor';
        }
        else if(objectKey == "deadAnimals"){
            bigpic = 'images/311Big.png';
            logo = 'images/311.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 4,
			    fillColor: '#e19ce2',
			    fillOpacity: .5,
			    strokeColor: '#e19ce2',
			    strokeOpacity: .7,
			    strokeWeight: 1
            };
            description = 'Dead Animal Removal';
        }
        else if(objectKey == "foodTrucks"){
            clickable = false;
            logo = 'images/foodTruck.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 4,
			    fillColor: '#3d2516',
			    fillOpacity: .5,
			    strokeColor: '#3d2516',
			    strokeOpacity: .7,
			    strokeWeight: 1
            };
            description = 'Food Truck';
        }
        else if(objectKey == "homeless"){
            bigpic = 'images/311Big.png';
            logo = 'images/311.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 4,
			    fillColor: '#d7ea2a',
			    fillOpacity: .5,
			    strokeColor: '#d7ea2a',
			    strokeOpacity: .7,
			    strokeWeight: 1
            };
            description = 'Homeless Encampment';
        }
        else if(objectKey == "graffiti"){
            bigpic = 'images/311Big.png';
            logo = 'images/311.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 4,
			    fillColor: '#898016',
			    fillOpacity: .5,
			    strokeColor: '#898016',
			    strokeOpacity: .7,
			    strokeWeight: 1
            };
            description = 'Graffiti Removal';
        }
        else if(objectKey == "LoRa"){
            clickable = true;
            bigpic = 'images/cci_sensors.png';
            logo = 'images/CCI.png';
            pinicon =  {
			    path: google.maps.SymbolPath.CIRCLE,
			    scale: 5,
			    //fillColor: '#891630',
                fillColor: 'yellow',
			    fillOpacity: .5,
			    strokeColor: '#891630',
			    strokeOpacity: .7,
			    strokeWeight: 1
            };
            description = 'CCI IoT Testbed';
            productInfo = products.cci.description;
            links = products.cci.links;
        }
        
        
 
        devices = mapSpec.devices[objectKey];
        addMarkers(map,devices,pinicon,description,logo,bigpic,clickable,productInfo,links);  
        
    });
    
    for(i=0;i<mapSpec.areas.length;i++){
        if(mapSpec.areas[i].center){
            var windowcontent = '<img src="'+mapSpec.areas[i].icon+'" alt="logo"><h4 style="text-align: center;">'+mapSpec.areas[i].description+'</h4>';
            mapSpec.areas[i]['marker'] = new google.maps.Marker({
                position: mapSpec.areas[i].center,
                visible: false,
                map: map,
                });
            mapSpec.areas[i]['window'] = new google.maps.InfoWindow({content:windowcontent});
        }
        addMapArea(map,maps[mapSpec.areas[i].load],mapSpec.areas[i]);   
    }
}

var uscPosition;
var laxPosition;
var dtlaPosition;
var rthPosition;


function addMapArea(map, mapSpec, area ){
    
    
    // Construct the polygon.
    var shape = new google.maps.Polygon({
      paths: area.shape,
      strokeColor: '#ad6050',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#ad6050',
      fillOpacity: 0.1
    });
    shape.setMap(map);

    google.maps.event.addListener(shape, 'click', function (event) {
        if(area.product){
            displayInfo(area.product,area.description,products.lax.description,products.lax.links);
        }
        else loadMap(mapSpec);
    });
    
    google.maps.event.addListener(shape,"mouseover",function(){
        this.setOptions({fillOpacity: .4});
        if(area.center){
            area.window.open(map,area.marker);
        }
        
    }); 
    google.maps.event.addListener(shape,"mouseout",function(){
        this.setOptions({fillOpacity: .1});
        if(area.center){
            area.window.close();
        }
    });
    
    return shape
}


// Initialize map
function initMap() {
    uscPosition = new google.maps.LatLng(34.021070191733735, -118.28620075929513);
    laxPosition = new google.maps.LatLng(33.94414278048475, -118.40268373239383);
    dtlaPosition = new google.maps.LatLng(34.048758834199745, -118.25289744633784);
    loadMap(maps.city);
}


function displayInfo(picture,heading,description,links){
    document.getElementById("toggle").style.display = "none";
    document.getElementById("bigpic").innerHTML = picture;
    document.getElementById("infoHeading").innerHTML = heading;
    document.getElementById("productInfo").innerHTML = description;
    document.getElementById("links").innerHTML = links;
    $( "#toggle" ).slideToggle();
}  

function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}


function display(){
    document.getElementById("myUL").style.display="inline";
}


function showMetro(){
    var picture = '<img src="'+'images/metro.jpg'+'" alt="logo">';
    var heading = 'LA Metro';
    var productInfo = products.metro.description;
    var links = products.metro.links;
    displayInfo(picture,heading,productInfo,links);
}











