function homeless_locs(){
var arr = [
{"policeprecinct": "NORTH HOLLYWOOD", "requesttype": "Homeless Encampment", "address": "4070 N LAUREL CANYON BLVD, 91604", "actiontaken": "SR Created", "createddate": "2017-06-29T08:21:40", "lat": "34.1455426004", "lng": "-118.395828544"},
{"policeprecinct": "NORTH HOLLYWOOD", "requesttype": "Homeless Encampment", "address": "4200 N LAUREL CANYON BLVD, 91604", "actiontaken": "SR Created", "createddate": "2017-06-29T08:17:50", "lat": "34.1469060179", "lng": "-118.39628763"},
{"policeprecinct": "HARBOR", "requesttype": "Homeless Encampment", "address": "838 S PALOS VERDES ST, 90731", "actiontaken": "SR Created", "createddate": "2017-06-29T07:40:19", "lat": "33.7361868008", "lng": "-118.281268445"},
{"policeprecinct": "HOLLYWOOD", "requesttype": "Homeless Encampment", "address": "1121 N SEWARD ST, 90038", "actiontaken": "SR Created", "createddate": "2017-06-29T07:09:52", "lat": "34.0914050996", "lng": "-118.333400647"},
{"policeprecinct": "NORTH HOLLYWOOD", "requesttype": "Homeless Encampment", "address": "5221 N CLEON AVE, 91601", "actiontaken": "SR Created", "createddate": "2017-06-29T07:00:55", "lat": "34.165610274", "lng": "-118.368755601"},
{"policeprecinct": "NEWTON", "requesttype": "Homeless Encampment", "address": "354 W 47TH ST, 90037", "actiontaken": "SR Created", "createddate": "2017-06-29T06:40:01", "lat": "34.0008451639", "lng": "-118.280306615"},
{"policeprecinct": "WILSHIRE", "requesttype": "Homeless Encampment", "address": "236 S DETROIT ST, 90036", "actiontaken": "SR Created", "createddate": "2017-06-29T06:28:54", "lat": "34.0702224314", "lng": "-118.345052038"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Homeless Encampment", "address": "8927 N WINNETKA AVE, 91311", "actiontaken": "SR Created", "createddate": "2017-06-29T00:15:40", "lat": "34.233223584", "lng": "-118.571286352"},
{"policeprecinct": "VAN NUYS", "requesttype": "Homeless Encampment", "address": "7200 N WOODMAN AVE, 91405", "actiontaken": "SR Created", "createddate": "2017-06-28T22:58:28", "lat": "34.2014199505", "lng": "-118.431090848"},
{"policeprecinct": "NORTH HOLLYWOOD", "requesttype": "Homeless Encampment", "address": "4214 N LAUREL CANYON BLVD, 91604", "actiontaken": "SR Created", "createddate": "2017-06-28T22:43:21", "lat": "34.146924977", "lng": "-118.396291143"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Homeless Encampment", "address": "9201 N WINNETKA AVE, 91311", "actiontaken": "SR Created", "createddate": "2017-06-28T21:49:22", "lat": "34.2373912014", "lng": "-118.571502587"},
{"policeprecinct": "FOOTHILL", "requesttype": "Homeless Encampment", "address": "10634 N SHERMAN GROVE AVE, 91040", "actiontaken": "SR Created", "createddate": "2017-06-28T21:47:25", "lat": "34.2624798334", "lng": "-118.319971793"},
{"policeprecinct": "RAMPART", "requesttype": "Homeless Encampment", "address": "138 S UNION PL, 90026", "actiontaken": "SR Created", "createddate": "2017-06-28T20:23:50", "lat": "34.0627950488", "lng": "-118.264799476"},
{"policeprecinct": "FOOTHILL", "requesttype": "Homeless Encampment", "address": "8133 N VINELAND AVE, 91352", "actiontaken": "SR Created", "createddate": "2017-06-28T20:23:07", "lat": "34.2184446506", "lng": "-118.370531237"},
{"policeprecinct": "PACIFIC", "requesttype": "Homeless Encampment", "address": "4025 S LYCEUM AVE, 90066", "actiontaken": "SR Created", "createddate": "2017-06-28T20:22:22", "lat": "33.9940908245", "lng": "-118.438537041"},
{"policeprecinct": "RAMPART", "requesttype": "Homeless Encampment", "address": "1345 S EMERALD DR, 90026", "actiontaken": "SR Created", "createddate": "2017-06-28T19:34:51", "lat": "34.0596564997", "lng": "-118.260283269"},
{"policeprecinct": "PACIFIC", "requesttype": "Homeless Encampment", "address": "2800 S MILITARY AVE, 90064", "actiontaken": "SR Created", "createddate": "2017-06-28T19:34:05", "lat": "34.0312658154", "lng": "-118.427471333"},
{"policeprecinct": "FOOTHILL", "requesttype": "Homeless Encampment", "address": "8587 W FENWICK ST, 91040", "actiontaken": "SR Created", "createddate": "2017-06-28T18:59:05", "lat": "34.2622004819", "lng": "-118.31997811"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Homeless Encampment", "address": "9101 N WINNETKA AVE, 91311", "actiontaken": "SR Created", "createddate": "2017-06-28T18:50:46", "lat": "34.2355892865", "lng": "-118.571663233"},
{"policeprecinct": "VAN NUYS", "requesttype": "Homeless Encampment", "address": "7527 N ZOMBAR AVE, 91406", "actiontaken": "SR Created", "createddate": "2017-06-28T18:37:16", "lat": "34.2073278874", "lng": "-118.46745847"},
]
return arr;}

function graffiti_locs(){
var arr = [
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:59", "actiontaken": "SR Created", "address": "300 W 57TH ST, 90037", "lat": 33.9905825, "lng": -118.2783301},
{"requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:57", "actiontaken": "SR Created", "address": "1129 E 42ND PL", "lat": 34.0068281, "lng": -118.2557956},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:54", "actiontaken": "SR Created", "address": "4063 S ADAIR ST, 90011", "lat": 34.0094355, "lng": -118.2695894},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:52", "actiontaken": "SR Created", "address": "4200 S CENTRAL AVE, 90011", "lat": 34.00738, "lng": -118.256294},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:50", "actiontaken": "SR Created", "address": "4051 S ADAIR ST, 90011", "lat": 34.009591, "lng": -118.269449},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:47", "actiontaken": "SR Created", "address": "4000 S SAN PEDRO ST, 90011", "lat": 34.0110321, "lng": -118.2680441},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:45", "actiontaken": "SR Created", "address": "1232 E WASHINGTON BLVD, 90021", "lat": 34.024351, "lng": -118.250966},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:43", "actiontaken": "SR Created", "address": "1152 E WASHINGTON BLVD, 90021", "lat": 34.0249753, "lng": -118.2517142},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:40", "actiontaken": "SR Created", "address": "1080 E WASHINGTON BLVD, 90021", "lat": 34.0253291, "lng": -118.2524763},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:38", "actiontaken": "SR Created", "address": "770 E WASHINGTON BLVD, 90292", "lat": 34.0264219, "lng": -118.255486},
{"policeprecinct": "PACIFIC", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:36", "actiontaken": "SR Created", "address": "816 E WASHINGTON BLVD, 90292", "lat": 34.0260599, "lng": -118.2541549},
{"policeprecinct": "PACIFIC", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:34", "actiontaken": "SR Created", "address": "704 E WASHINGTON BLVD, 90292", "lat": 33.9868455, "lng": -118.4543844},
{"requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:32", "actiontaken": "SR Created", "address": "606 E WASHINGTON", "lat": 38.8829127, "lng": -76.9980728},
{"requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:39:29", "actiontaken": "SR Created", "address": "502 E WASHINGTON", "lat": 41.254331, "lng": -111.969116},
{"policeprecinct": "TOPANGA", "requesttype": "Graffiti Removal", "address": "WINNETKA AVE AT SATICOY ST, 91306", "actiontaken": "SR Created", "createddate": "2017-06-27T14:38:15", "lat": "34.2083201764", "lng": "-118.571050776"},
{"policeprecinct": "NORTHEAST", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:34:02", "actiontaken": "SR Created", "address": "2202 W RIVERSIDE DR, 90039", "lat": 34.1019054, "lng": -118.2512216},
{"policeprecinct": "NORTHEAST", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:34:00", "actiontaken": "SR Created", "address": "2100 W RIVERSIDE DR, 90039", "lat": 34.1555165, "lng": -118.3230642},
{"policeprecinct": "RAMPART", "requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:33:57", "actiontaken": "SR Created", "address": "1700 W TEMPLE ST, 90026", "lat": 34.0686394, "lng": -118.263053},
{"policeprecinct": "NEWTON", "requesttype": "Graffiti Removal", "address": "2300 E 11TH ST, 90021", "actiontaken": "SR Created", "createddate": "2017-06-27T14:33:28", "lat": "34.0230711219", "lng": "-118.230803219"},
{"requesttype": "Graffiti Removal", "createddate": "2017-06-27T14:32:27", "actiontaken": "SR Created", "address": "400 E WASHINGTON", "lat": 30.5451245, "lng": -83.86764230000001},
]
return arr;}

function dead_animal_locs(){
var arr = [
{"policeprecinct": "WILSHIRE", "requesttype": "Dead Animal Removal", "address": "309 N OGDEN DR, 90036", "actiontaken": "SR Created", "createddate": "2017-06-29T08:39:40", "lat": "34.0763258079", "lng": "-118.359562212"},
{"policeprecinct": "OLYMPIC", "requesttype": "Dead Animal Removal", "address": "513 S WESTERN AVE, 90020", "actiontaken": "SR Created", "createddate": "2017-06-29T08:25:09", "lat": "34.0650562993", "lng": "-118.309256895"},
{"policeprecinct": "NORTHEAST", "requesttype": "Dead Animal Removal", "address": "1223 N EL PASO DR, 90065", "actiontaken": "SR Created", "createddate": "2017-06-29T07:44:02", "lat": "34.1174980862", "lng": "-118.218010158"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Dead Animal Removal", "address": "MANITOU AVE AT HANCOCK ST, 90031", "actiontaken": "SR Created", "createddate": "2017-06-29T07:36:58", "lat": "34.0719352912", "lng": "-118.209080192"},
{"policeprecinct": "WEST VALLEY", "requesttype": "Dead Animal Removal", "address": "18921 W COVELLO ST, 91504", "actiontaken": "SR Created", "createddate": "2017-06-29T07:11:20", "lat": "34.2075876481", "lng": "-118.545799851"},
{"policeprecinct": "WILSHIRE", "requesttype": "Dead Animal Removal", "address": "714 N LAS PALMAS AVE, 90038", "actiontaken": "SR Created", "createddate": "2017-06-29T06:47:49", "lat": "34.0838974474", "lng": "-118.336143443"},
{"policeprecinct": "NEWTON", "requesttype": "Dead Animal Removal", "address": "COMPTON AVE AT 52ND ST, 90011", "actiontaken": "SR Created", "createddate": "2017-06-29T01:33:35", "lat": "33.9957323287", "lng": "-118.247802488"},
{"policeprecinct": "NORTHEAST", "requesttype": "Dead Animal Removal", "address": "319 N NEWLAND ST, 90042", "actiontaken": "SR Created", "createddate": "2017-06-28T23:13:20", "lat": "34.1189943197", "lng": "-118.185041399"},
{"policeprecinct": "SOUTHWEST", "requesttype": "Dead Animal Removal", "address": "LONGWOOD AVE AT ADAMS BLVD, 90016", "actiontaken": "SR Created", "createddate": "2017-06-28T20:05:04", "lat": "34.0325154797", "lng": "-118.34926088"},
{"policeprecinct": "HARBOR", "requesttype": "Dead Animal Removal", "address": "1218 S CENTRE ST, 90731", "actiontaken": "SR Created", "createddate": "2017-06-28T19:57:12", "lat": "33.7329006702", "lng": "-118.283458634"},
{"policeprecinct": "SOUTHWEST", "requesttype": "Dead Animal Removal", "address": "1107 W 40TH PL, 90037", "actiontaken": "SR Created", "createddate": "2017-06-28T19:35:50", "lat": "34.0100159894", "lng": "-118.294533264"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Dead Animal Removal", "address": "4775 E HUNTINGTON DR NORTH, 90032", "actiontaken": "SR Created", "createddate": "2017-06-28T18:52:27", "lat": "34.0859477192", "lng": "-118.181582417"},
{"policeprecinct": "NORTHEAST", "requesttype": "Dead Animal Removal", "address": "570 W AVENUE 26, 90065", "actiontaken": "SR Created", "createddate": "2017-06-28T18:52:27", "lat": "34.0852140495", "lng": "-118.224416273"},
{"policeprecinct": "NEWTON", "requesttype": "Dead Animal Removal", "address": "4860 S HOOPER AVE, 90011", "actiontaken": "SR Created", "createddate": "2017-06-28T18:37:21", "lat": "33.9989842752", "lng": "-118.252019706"},
{"policeprecinct": "PACIFIC", "requesttype": "Dead Animal Removal", "address": "6271 S DAMASK AVE, 90056", "actiontaken": "SR Created", "createddate": "2017-06-28T18:23:09", "lat": "33.9823408282", "lng": "-118.362485719"},
{"policeprecinct": "SOUTHEAST", "requesttype": "Dead Animal Removal", "address": "547 W 88TH ST, 90044", "actiontaken": "SR Created", "createddate": "2017-06-28T17:27:13", "lat": "33.9574490927", "lng": "-118.284400521"},
{"policeprecinct": "77TH STREET", "requesttype": "Dead Animal Removal", "address": "1737 W 65TH PL, 90047", "actiontaken": "SR Created", "createddate": "2017-06-28T17:10:38", "lat": "33.9798937094", "lng": "-118.308041386"},
{"policeprecinct": "VAN NUYS", "requesttype": "Dead Animal Removal", "address": "6525 N SEPULVEDA BLVD, 91411", "actiontaken": "SR Created", "createddate": "2017-06-28T16:46:12", "lat": "34.1892940155", "lng": "-118.466653128"},
{"policeprecinct": "VAN NUYS", "requesttype": "Dead Animal Removal", "address": "6225 N SEPULVEDA BLVD, 91411", "actiontaken": "SR Created", "createddate": "2017-06-28T16:44:36", "lat": "34.1835341213", "lng": "-118.466335557"},
{"policeprecinct": "SOUTHWEST", "requesttype": "Dead Animal Removal", "address": "1251 W 35TH ST, 90007", "actiontaken": "SR Created", "createddate": "2017-06-28T16:42:52", "lat": "34.0246230127", "lng": "-118.296041833"},
]
return arr;}

function illegal_dumping_locs(){
var arr = [
{"policeprecinct": "HOLLYWOOD", "requesttype": "Illegal Dumping Pickup", "address": "1309 N DETROIT ST, 90046", "actiontaken": "SR Created", "createddate": "2017-06-27T14:38:30", "lat": "34.0946718825", "lng": "-118.345349483"},
{"policeprecinct": "77TH STREET", "requesttype": "Illegal Dumping Pickup", "address": "142 E 85TH ST, 90003", "actiontaken": "SR Created", "createddate": "2017-06-27T14:34:13", "lat": "33.9608378425", "lng": "-118.272413324"},
{"policeprecinct": "RAMPART", "requesttype": "Illegal Dumping Pickup", "address": "2629 W 8TH ST, 90057", "actiontaken": "SR Created", "createddate": "2017-06-27T14:33:57", "lat": "34.0576857261", "lng": "-118.28383922"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Illegal Dumping Pickup", "address": "3473 SABINA ST, 90023", "actiontaken": "SR Created", "createddate": "2017-06-27T14:32:00", "lat": "34.029012694", "lng": "-118.197523488"},
{"policeprecinct": "OLYMPIC", "requesttype": "Illegal Dumping Pickup", "address": "1310 S FEDORA ST, 90006", "actiontaken": "SR Created", "createddate": "2017-06-27T14:31:45", "lat": "34.046821884", "lng": "-118.297509371"},
{"policeprecinct": "VAN NUYS", "requesttype": "Illegal Dumping Pickup", "address": "14747 W LULL ST, 91405", "actiontaken": "SR Created", "createddate": "2017-06-27T14:30:50", "lat": "34.2096366584", "lng": "-118.454653539"},
{"policeprecinct": "WEST VALLEY", "requesttype": "Illegal Dumping Pickup", "address": "15746 W VANOWEN ST, 91406", "actiontaken": "SR Created", "createddate": "2017-06-27T14:23:37", "lat": "34.1936548588", "lng": "-118.476554422"},
{"policeprecinct": "77TH STREET", "requesttype": "Illegal Dumping Pickup", "address": "1530 W 69TH ST, 90047", "actiontaken": "SR Created", "createddate": "2017-06-27T14:22:21", "lat": "33.9768756284", "lng": "-118.303498376"},
{"policeprecinct": "SOUTHEAST", "requesttype": "Illegal Dumping Pickup", "address": "11815 S FIGUEROA ST, 90061", "actiontaken": "SR Created", "createddate": "2017-06-27T14:20:40", "lat": "33.9256291263", "lng": "-118.282823318"},
{"policeprecinct": "HARBOR", "requesttype": "Illegal Dumping Pickup", "address": "1625 W 208TH ST, 90501", "actiontaken": "SR Created", "createddate": "2017-06-27T14:19:45", "lat": "33.8419809332", "lng": "-118.307563349"},
{"policeprecinct": "NEWTON", "requesttype": "Illegal Dumping Pickup", "address": "1461 S ALAMEDA ST, 90021", "actiontaken": "SR Created", "createddate": "2017-06-27T14:16:36", "lat": "34.024302708", "lng": "-118.239417797"},
{"policeprecinct": "77TH STREET", "requesttype": "Illegal Dumping Pickup", "address": "9461 S NORMANDIE AVE, 90044", "actiontaken": "SR Created", "createddate": "2017-06-27T14:13:29", "lat": "33.9501489397", "lng": "-118.30041931"},
{"policeprecinct": "RAMPART", "requesttype": "Illegal Dumping Pickup", "address": "1304 W 7TH ST, 90017", "actiontaken": "SR Created", "createddate": "2017-06-27T14:12:19", "lat": "34.0522841956", "lng": "-118.267885221"},
{"policeprecinct": "HARBOR", "requesttype": "Illegal Dumping Pickup", "address": "603 W 9TH ST, 90731", "actiontaken": "SR Created", "createddate": "2017-06-27T14:08:26", "lat": "33.7359266661", "lng": "-118.290415967"},
{"policeprecinct": "MISSION", "requesttype": "Illegal Dumping Pickup", "address": "14924 W ROSCOE BLVD, 91402", "actiontaken": "SR Created", "createddate": "2017-06-27T14:06:47", "lat": "34.2212995556", "lng": "-118.458237064"},
{"policeprecinct": "MISSION", "requesttype": "Illegal Dumping Pickup", "address": "8241 N BRIMFIELD AVE, 91402", "actiontaken": "SR Created", "createddate": "2017-06-27T14:04:45", "lat": "34.220956367", "lng": "-118.459066854"},
{"policeprecinct": "PACIFIC", "requesttype": "Illegal Dumping Pickup", "address": "50 E NAVY ST, 90291", "actiontaken": "SR Created", "createddate": "2017-06-27T14:02:48", "lat": "33.9965904734", "lng": "-118.48018741"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Illegal Dumping Pickup", "address": "9810 N ZELZAH AVE, 91325", "actiontaken": "SR Created", "createddate": "2017-06-27T14:02:26", "lat": "34.2489698706", "lng": "-118.523152736"},
{"policeprecinct": "MISSION", "requesttype": "Illegal Dumping Pickup", "address": "8745 N WILLIS AVE, 91402", "actiontaken": "SR Created", "createddate": "2017-06-27T14:01:41", "lat": "34.2294835308", "lng": "-118.455614759"},
{"policeprecinct": "WILSHIRE", "requesttype": "Illegal Dumping Pickup", "address": "320 S WILLAMAN DR, 90048", "actiontaken": "SR Created", "createddate": "2017-06-27T14:00:25", "lat": "34.0729297031", "lng": "-118.380482527"},
]
return arr;}

function electronic_locs(){
var arr = [
{"policeprecinct": "HOLLYWOOD", "requesttype": "Electronic Waste", "address": "1027 N HUDSON AVE, 90038", "actiontaken": "SR Created", "createddate": "2017-06-29T08:34:07", "lat": "34.0896823328", "lng": "-118.332253069"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Electronic Waste", "address": "10603 N DEBRA AVE, 91344", "actiontaken": "SR Created", "createddate": "2017-06-29T08:30:44", "lat": "34.2628827762", "lng": "-118.489605886"},
{"policeprecinct": "WILSHIRE", "requesttype": "Electronic Waste", "address": "1841 S CLYDE AVE, 90019", "actiontaken": "SR Created", "createddate": "2017-06-29T08:28:17", "lat": "34.0419514921", "lng": "-118.363954512"},
{"policeprecinct": "MISSION", "requesttype": "Electronic Waste", "address": "12712 N NORRIS AVE, 91342", "actiontaken": "SR Created", "createddate": "2017-06-29T08:22:58", "lat": "34.3012629649", "lng": "-118.450975259"},
{"policeprecinct": "PACIFIC", "requesttype": "Electronic Waste", "address": "12941 W RUBENS AVE, 90066", "actiontaken": "SR Created", "createddate": "2017-06-29T08:14:03", "lat": "33.9842478702", "lng": "-118.429588258"},
{"policeprecinct": "77TH STREET", "requesttype": "Electronic Waste", "address": "1351 W 65TH ST, 90044", "actiontaken": "SR Created", "createddate": "2017-06-29T07:05:24", "lat": "33.980703228", "lng": "-118.299880656"},
{"policeprecinct": "VAN NUYS", "requesttype": "Electronic Waste", "address": "13754 W SHERMAN WAY, 91405", "actiontaken": "SR Created", "createddate": "2017-06-29T06:08:20", "lat": "34.2010067623", "lng": "-118.433229939"},
{"policeprecinct": "TOPANGA", "requesttype": "Electronic Waste", "address": "6036 N ELLENVIEW AVE, 91367", "actiontaken": "SR Created", "createddate": "2017-06-28T23:33:38", "lat": "34.1807792837", "lng": "-118.659552925"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Electronic Waste", "address": "3103 N PUEBLO AVE, 90032", "actiontaken": "SR Created", "createddate": "2017-06-28T22:37:15", "lat": "34.081261085", "lng": "-118.174385978"},
{"policeprecinct": "77TH STREET", "requesttype": "Electronic Waste", "address": "727 W 57TH ST, 90037", "actiontaken": "SR Created", "createddate": "2017-06-28T22:29:45", "lat": "33.9906370144", "lng": "-118.286660296"},
{"policeprecinct": "WILSHIRE", "requesttype": "Electronic Waste", "address": "320 S ARNAZ DR, 90048", "actiontaken": "SR Created", "createddate": "2017-06-28T22:20:44", "lat": "34.0728997459", "lng": "-118.382595576"},
{"policeprecinct": "HOLLYWOOD", "requesttype": "Electronic Waste", "address": "1162 N HOBART BLVD, 90029", "actiontaken": "SR Created", "createddate": "2017-06-28T21:49:35", "lat": "34.0923433235", "lng": "-118.304546025"},
{"policeprecinct": "RAMPART", "requesttype": "Electronic Waste", "address": "1225 W BOSTON ST, 90026", "actiontaken": "SR Created", "createddate": "2017-06-28T21:37:09", "lat": "34.0663701698", "lng": "-118.25272959"},
{"policeprecinct": "OLYMPIC", "requesttype": "Electronic Waste", "address": "1805 S VAN NESS AVE, 90019", "actiontaken": "SR Created", "createddate": "2017-06-28T21:28:16", "lat": "34.041455568", "lng": "-118.316611188"},
{"policeprecinct": "VAN NUYS", "requesttype": "Electronic Waste", "address": "14436 W VALERIO ST, 91405", "actiontaken": "SR Created", "createddate": "2017-06-28T21:22:08", "lat": "34.2047022818", "lng": "-118.448060209"},
{"policeprecinct": "WEST VALLEY", "requesttype": "Electronic Waste", "address": "5425 N RHEA AVE, 91356", "actiontaken": "SR Created", "createddate": "2017-06-28T21:20:14", "lat": "34.1696949751", "lng": "-118.542160581"},
{"policeprecinct": "77TH STREET", "requesttype": "Electronic Waste", "address": "3106 W 59TH PL, 90043", "actiontaken": "SR Created", "createddate": "2017-06-28T20:17:57", "lat": "33.98620249", "lng": "-118.326775601"},
{"policeprecinct": "SOUTHWEST", "requesttype": "Electronic Waste", "address": "4816 W AUGUST ST, 90008", "actiontaken": "SR Created", "createddate": "2017-06-28T19:56:48", "lat": "34.0171609614", "lng": "-118.352053999"},
{"policeprecinct": "PACIFIC", "requesttype": "Electronic Waste", "address": "6628 W 80TH PL, 90045", "actiontaken": "SR Created", "createddate": "2017-06-28T19:47:16", "lat": "33.9658364528", "lng": "-118.405663908"},
{"policeprecinct": "NEWTON", "requesttype": "Electronic Waste", "address": "115 W 69TH ST, 90003", "actiontaken": "SR Created", "createddate": "2017-06-28T19:45:18", "lat": "33.9774605256", "lng": "-118.274373225"},
]
return arr;}

function bulky_items_locs(){
var arr = [
{"policeprecinct": "SOUTHEAST", "requesttype": "Bulky Items", "address": "151 E 88TH PL, 90003", "actiontaken": "SR Created", "createddate": "2017-06-29T08:39:48", "lat": "33.9565636793", "lng": "-118.272167366"},
{"policeprecinct": "WEST LOS ANGELES", "requesttype": "Bulky Items", "address": "8982 W CADILLAC AVE, 90034", "actiontaken": "SR Created", "createddate": "2017-06-29T08:39:38", "lat": "34.0408933264", "lng": "-118.387351325"},
{"policeprecinct": "VAN NUYS", "requesttype": "Bulky Items", "address": "13611 W HAMLIN ST, 91401", "actiontaken": "SR Created", "createddate": "2017-06-29T08:39:37", "lat": "34.18861703", "lng": "-118.429558378"},
{"policeprecinct": "MISSION", "requesttype": "Bulky Items", "address": "PARTHENIA ST AT SEPULVEDA BLVD, 91343", "actiontaken": "SR Created", "createddate": "2017-06-29T08:39:22", "lat": "34.2282627351", "lng": "-118.467702865"},
{"policeprecinct": "MISSION", "requesttype": "Bulky Items", "address": "10146 N BARTEE AVE, 91331", "actiontaken": "SR Created", "createddate": "2017-06-29T08:38:21", "lat": "34.2548491775", "lng": "-118.436562626"},
{"policeprecinct": "MISSION", "requesttype": "Bulky Items", "address": "8554 BURNET AV, 91343", "actiontaken": "SR Created", "createddate": "2017-06-29T08:38:20", "lat": "34.2260152356", "lng": "-118.463245659"},
{"policeprecinct": "NORTHEAST", "requesttype": "Bulky Items", "address": "1022 N ROCKDALE AVE, 90041", "actiontaken": "SR Created", "createddate": "2017-06-29T08:38:11", "lat": "34.1338657941", "lng": "-118.188736245"},
{"policeprecinct": "PACIFIC", "requesttype": "Bulky Items", "address": "12133 W MITCHELL AVE, 90066", "actiontaken": "SR Created", "createddate": "2017-06-29T08:37:54", "lat": "34.0017510893", "lng": "-118.428008193"},
{"policeprecinct": "SOUTHEAST", "requesttype": "Bulky Items", "address": "156 W 88TH PL, 90003", "actiontaken": "SR Created", "createddate": "2017-06-29T08:37:40", "lat": "33.9563514379", "lng": "-118.275958408"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Bulky Items", "address": "3327 N WINCHESTER AVE, 90032", "actiontaken": "SR Created", "createddate": "2017-06-29T08:37:25", "lat": "34.0844291325", "lng": "-118.160634794"},
{"policeprecinct": "WEST LOS ANGELES", "requesttype": "Bulky Items", "address": "11645 W MONTANA AVE, 90049", "actiontaken": "SR Created", "createddate": "2017-06-29T08:37:20", "lat": "34.0562570666", "lng": "-118.465748686"},
{"policeprecinct": "MISSION", "requesttype": "Bulky Items", "address": "10146 N BARTEE AVE, 91331", "actiontaken": "SR Created", "createddate": "2017-06-29T08:37:14", "lat": "34.2548491775", "lng": "-118.436562626"},
{"policeprecinct": "PACIFIC", "requesttype": "Bulky Items", "address": "4141 S MARCASEL AVE, 90066", "actiontaken": "SR Created", "createddate": "2017-06-29T08:37:06", "lat": "34.0000078906", "lng": "-118.422381357"},
{"policeprecinct": "MISSION", "requesttype": "Bulky Items", "address": "13243 N DRONFIELD AVE, 91342", "actiontaken": "SR Created", "createddate": "2017-06-29T08:36:42", "lat": "34.3114779216", "lng": "-118.442292684"},
{"policeprecinct": "77TH STREET", "requesttype": "Bulky Items", "address": "319 W 81ST ST, 90003", "actiontaken": "SR Created", "createddate": "2017-06-29T08:36:31", "lat": "33.9660490937", "lng": "-118.278997684"},
{"policeprecinct": "WEST LOS ANGELES", "requesttype": "Bulky Items", "address": "1980 S GARTH AVE, 90034", "actiontaken": "SR Created", "createddate": "2017-06-29T08:36:13", "lat": "34.0408665184", "lng": "-118.379002725"},
{"policeprecinct": "NORTHEAST", "requesttype": "Bulky Items", "address": "125 S AVENUE 60, 90042", "actiontaken": "SR Created", "createddate": "2017-06-29T08:35:23", "lat": "34.1107360272", "lng": "-118.188540534"},
{"policeprecinct": "OLYMPIC", "requesttype": "Bulky Items", "address": "357 S WESTERN AVE, 90020", "actiontaken": "SR Created", "createddate": "2017-06-29T08:34:49", "lat": "34.067495242", "lng": "-118.309354942"},
{"policeprecinct": "77TH STREET", "requesttype": "Bulky Items", "address": "1216 W 78TH ST, 90044", "actiontaken": "SR Created", "createddate": "2017-06-29T08:31:45", "lat": "33.9692733729", "lng": "-118.296967683"},
{"policeprecinct": "PACIFIC", "requesttype": "Bulky Items", "address": "8029 S HOLY CROSS PL, 90045", "actiontaken": "SR Created", "createddate": "2017-06-29T08:29:08", "lat": "33.96490242", "lng": "-118.415829825"},
]
return arr;}

function metal_locs(){
var arr = [
{"policeprecinct": "77TH STREET", "requesttype": "Metal/Household Appliances", "address": "1216 W 78TH ST, 90044", "actiontaken": "SR Created", "createddate": "2017-06-29T08:32:57", "lat": "33.9692733729", "lng": "-118.296967683"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Metal/Household Appliances", "address": "10603 N DEBRA AVE, 91344", "actiontaken": "SR Created", "createddate": "2017-06-29T08:29:09", "lat": "34.2628827762", "lng": "-118.489605886"},
{"policeprecinct": "FOOTHILL", "requesttype": "Metal/Household Appliances", "address": "10435 N MT GLEASON AVE, 91040", "actiontaken": "SR Created", "createddate": "2017-06-29T08:17:57", "lat": "34.2586682261", "lng": "-118.302875703"},
{"policeprecinct": "WEST VALLEY", "requesttype": "Metal/Household Appliances", "address": "7505 N CANBY AVE, 91335", "actiontaken": "SR Created", "createddate": "2017-06-29T08:14:14", "lat": "34.2068875576", "lng": "-118.534049561"},
{"policeprecinct": "77TH STREET", "requesttype": "Metal/Household Appliances", "address": "2035 W 69TH ST, 90047", "actiontaken": "SR Created", "createddate": "2017-06-29T08:09:08", "lat": "33.9771021603", "lng": "-118.314696549"},
{"policeprecinct": "SOUTHEAST", "requesttype": "Metal/Household Appliances", "address": "711 W 148TH DR, 90247", "actiontaken": "SR Created", "createddate": "2017-06-29T08:07:20", "lat": "33.8969061271", "lng": "-118.288145615"},
{"policeprecinct": "TOPANGA", "requesttype": "Metal/Household Appliances", "address": "7839 N FARRALONE AVE, 91304", "actiontaken": "SR Created", "createddate": "2017-06-29T08:01:25", "lat": "34.2131289921", "lng": "-118.610572509"},
{"policeprecinct": "MISSION", "requesttype": "Metal/Household Appliances", "address": "13087 N FELLOWS AVE, 91342", "actiontaken": "SR Created", "createddate": "2017-06-29T07:57:35", "lat": "34.3074024244", "lng": "-118.447094576"},
{"policeprecinct": "NORTH HOLLYWOOD", "requesttype": "Metal/Household Appliances", "address": "11326 W DONA LOLA DR, 91604", "actiontaken": "SR Created", "createddate": "2017-06-29T07:48:01", "lat": "34.132081215", "lng": "-118.37764256"},
{"policeprecinct": "NEWTON", "requesttype": "Metal/Household Appliances", "address": "154 W VERNON AVE, 90037", "actiontaken": "SR Created", "createddate": "2017-06-29T07:46:06", "lat": "34.0035964238", "lng": "-118.275386904"},
{"policeprecinct": "WILSHIRE", "requesttype": "Metal/Household Appliances", "address": "855 N ORLANDO AVE, 90069", "actiontaken": "SR Created", "createddate": "2017-06-29T07:29:51", "lat": "34.0868501147", "lng": "-118.373337084"},
{"policeprecinct": "NORTH HOLLYWOOD", "requesttype": "Metal/Household Appliances", "address": "5949 N WHITSETT AVE, 91607", "actiontaken": "SR Created", "createddate": "2017-06-29T07:21:03", "lat": "34.1789073858", "lng": "-118.405464287"},
{"policeprecinct": "RAMPART", "requesttype": "Metal/Household Appliances", "address": "4131 W NORMAL AVE, 90029", "actiontaken": "SR Created", "createddate": "2017-06-29T07:16:37", "lat": "34.0867347615", "lng": "-118.285643879"},
{"policeprecinct": "VAN NUYS", "requesttype": "Metal/Household Appliances", "address": "13754 W SHERMAN WAY, 91405", "actiontaken": "SR Created", "createddate": "2017-06-29T06:11:40", "lat": "34.2010067623", "lng": "-118.433229939"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Metal/Household Appliances", "address": "3232 N CASTALIA AVE, 90032", "actiontaken": "SR Created", "createddate": "2017-06-29T05:58:08", "lat": "34.0829406697", "lng": "-118.175287242"},
{"policeprecinct": "MISSION", "requesttype": "Metal/Household Appliances", "address": "14321 W TYLER ST, 91342", "actiontaken": "SR Created", "createddate": "2017-06-29T05:52:25", "lat": "34.3181580332", "lng": "-118.444676409"},
{"policeprecinct": "NORTH HOLLYWOOD", "requesttype": "Metal/Household Appliances", "address": "11215 W CAMARILLO ST, 91602", "actiontaken": "SR Created", "createddate": "2017-06-29T00:47:14", "lat": "34.1577688997", "lng": "-118.37502853"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Metal/Household Appliances", "address": "5082 E ITHACA AVE, 90032", "actiontaken": "SR Created", "createddate": "2017-06-29T00:41:37", "lat": "34.0716764399", "lng": "-118.175977668"},
{"policeprecinct": "TOPANGA", "requesttype": "Metal/Household Appliances", "address": "23527 W OXNARD ST, 91367", "actiontaken": "SR Created", "createddate": "2017-06-28T23:12:15", "lat": "34.1792868002", "lng": "-118.63967895"},
{"policeprecinct": "MISSION", "requesttype": "Metal/Household Appliances", "address": "7833 N VENTURA CANYON AVE, 91402", "actiontaken": "SR Created", "createddate": "2017-06-28T22:45:37", "lat": "34.2127958228", "lng": "-118.42887074"},
]
return arr;}

function water_waste_locs(){
var arr = [
{"policeprecinct": "HARBOR", "requesttype": "Report Water Waste", "address": "450 N WILMINGTON BLVD, 90744", "actiontaken": "SR Created", "createddate": "2017-06-29T08:27:22", "lat": "33.7746409032", "lng": "-118.273618579"},
{"policeprecinct": "HARBOR", "requesttype": "Report Water Waste", "address": "1712 N TAPER AVE, 90731", "actiontaken": "SR Created", "createddate": "2017-06-29T08:03:40", "lat": "33.7610440558", "lng": "-118.298683634"},
{"policeprecinct": "WEST LOS ANGELES", "requesttype": "Report Water Waste", "address": "401 N AMALFI DR, 90272", "actiontaken": "SR Created", "createddate": "2017-06-28T23:27:31", "lat": "34.0335472224", "lng": "-118.515214708"},
{"policeprecinct": "PACIFIC", "requesttype": "Report Water Waste", "address": "4040 S GLENCOE AVE, 90292", "actiontaken": "SR Created", "createddate": "2017-06-28T21:00:36", "lat": "33.99114138", "lng": "-118.443866905"},
{"policeprecinct": "PACIFIC", "requesttype": "Report Water Waste", "address": "4201 S GLENCOE AVE, 90292", "actiontaken": "SR Created", "createddate": "2017-06-28T20:54:17", "lat": "33.9884047975", "lng": "-118.441585382"},
{"policeprecinct": "NORTH HOLLYWOOD", "requesttype": "Report Water Waste", "address": "12109 W MAXWELLTON ROAD, 91604", "actiontaken": "SR Created", "createddate": "2017-06-28T11:17:57", "lat": "34.1408197011", "lng": "-118.397089337"},
{"policeprecinct": "WEST LOS ANGELES", "requesttype": "Report Water Waste", "address": "1640 S ARMACOST AVE, 90025", "actiontaken": "SR Created", "createddate": "2017-06-28T10:36:06", "lat": "34.0394489703", "lng": "-118.457982278"},
{"policeprecinct": "VAN NUYS", "requesttype": "Report Water Waste", "address": "14347 W COLLINS ST, 91401", "actiontaken": "SR Created", "createddate": "2017-06-27T17:25:35", "lat": "34.1740655619", "lng": "-118.446049386"},
{"policeprecinct": "TOPANGA", "requesttype": "Report Water Waste", "address": "21820 W CALIFA ST, 91367", "actiontaken": "SR Created", "createddate": "2017-06-27T17:18:40", "lat": "34.1770497128", "lng": "-118.603436448"},
{"policeprecinct": "77TH STREET", "requesttype": "Report Water Waste", "address": "6007 S ST ANDREWS PL, 90047", "actiontaken": "SR Created", "createddate": "2017-06-27T15:53:30", "lat": "33.9848340465", "lng": "-118.311646437"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Report Water Waste", "address": "18334 W BLACKHAWK ST, 91326", "actiontaken": "SR Created", "createddate": "2017-06-27T14:00:22", "lat": "34.2580390246", "lng": "-118.533246485"},
{"policeprecinct": "WILSHIRE", "requesttype": "Report Water Waste", "address": "4813 W WASHINGTON BLVD, 90016", "actiontaken": "SR Created", "createddate": "2017-06-27T11:06:40", "lat": "34.0399767169", "lng": "-118.344152512"},
{"policeprecinct": "PACIFIC", "requesttype": "Report Water Waste", "address": "3619 S CARDIFF AVE, 90034", "actiontaken": "SR Created", "createddate": "2017-06-27T09:00:53", "lat": "34.0281372084", "lng": "-118.398621317"},
{"policeprecinct": "HOLLYWOOD", "requesttype": "Report Water Waste", "address": "2005 N HIGHLAND AVE, 90068", "actiontaken": "SR Created", "createddate": "2017-06-26T21:57:14", "lat": "34.1067039984", "lng": "-118.337711502"},
{"policeprecinct": "NORTHEAST", "requesttype": "Report Water Waste", "address": "EAGLE VISTA DR AT FIGUEROA ST, 90041", "actiontaken": "SR Created", "createddate": "2017-06-26T20:16:59", "lat": "34.1422989266", "lng": "-118.185989431"},
{"policeprecinct": "NORTHEAST", "requesttype": "Report Water Waste", "address": "4127 W GARDEN AVE, 90039", "actiontaken": "SR Created", "createddate": "2017-06-26T14:42:57", "lat": "34.1267499101", "lng": "-118.269161758"},
{"policeprecinct": "HARBOR", "requesttype": "Report Water Waste", "address": "25500 S VERMONT AVE, 90710", "actiontaken": "SR Created", "createddate": "2017-06-26T14:21:00", "lat": "33.7924334645", "lng": "-118.290526323"},
{"policeprecinct": "PACIFIC", "requesttype": "Report Water Waste", "address": "5711 W CENTURY BLVD, 90045", "actiontaken": "SR Created", "createddate": "2017-06-26T11:18:58", "lat": "33.945715383", "lng": "-118.38132563"},
{"policeprecinct": "HOLLYWOOD", "requesttype": "Report Water Waste", "address": "2005 N HIGHLAND AVE, 90068", "actiontaken": "SR Created", "createddate": "2017-06-25T18:26:55", "lat": "34.1067039984", "lng": "-118.337711502"},
{"policeprecinct": "HOLLYWOOD", "requesttype": "Report Water Waste", "address": "2009 N HIGHLAND AVE, 90068", "actiontaken": "SR Created", "createddate": "2017-06-25T18:26:10", "lat": "34.1068679958", "lng": "-118.337764818"},
]
return arr;}

function s_streetlight_locs(){
var arr = [
{"policeprecinct": "WEST VALLEY", "requesttype": "Single Streetlight Issue", "address": "18617 W BLYTHE ST, 91335", "actiontaken": "SR Created", "createddate": "2017-06-29T08:20:33", "lat": "34.21478455", "lng": "-118.538948469999"},
{"policeprecinct": "NEWTON", "requesttype": "Single Streetlight Issue", "address": "359 W 41ST ST, 90037", "actiontaken": "SR Created", "createddate": "2017-06-29T07:49:49", "lat": "34.00950547", "lng": "-118.27991463"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Single Streetlight Issue", "address": "18100 W LASSEN ST, 91325", "actiontaken": "SR Created", "createddate": "2017-06-29T07:20:05", "lat": "34.24984178", "lng": "-118.52744903"},
{"policeprecinct": "WEST LOS ANGELES", "requesttype": "Single Streetlight Issue", "address": "10723 W EASTBORNE AVE, 90024", "actiontaken": "SR Created", "createddate": "2017-06-29T03:02:50", "lat": "34.05295319", "lng": "-118.43251057"},
{"policeprecinct": "MISSION", "requesttype": "Single Streetlight Issue", "address": "15151 W FOOTHILL BLVD, 91342", "actiontaken": "SR Created", "createddate": "2017-06-29T00:25:22", "lat": "34.32274624", "lng": "-118.4619875"},
{"policeprecinct": "TOPANGA", "requesttype": "Single Streetlight Issue", "address": "7828 N CASABA AVE, 91306", "actiontaken": "SR Created", "createddate": "2017-06-28T23:10:34", "lat": "34.21267213", "lng": "-118.57709036"},
{"policeprecinct": "FOOTHILL", "requesttype": "Single Streetlight Issue", "address": "13856 W JUDD ST, 91331", "actiontaken": "SR Created", "createddate": "2017-06-28T22:59:11", "lat": "34.26042371", "lng": "-118.43519714"},
{"policeprecinct": "OLYMPIC", "requesttype": "Single Streetlight Issue", "address": "2020 S GRAMERCY PL, 90018", "actiontaken": "SR Created", "createddate": "2017-06-28T22:41:39", "lat": "34.03774174", "lng": "-118.31316031"},
{"policeprecinct": "OLYMPIC", "requesttype": "Single Streetlight Issue", "address": "2968 W FRANCIS AVE, 90005", "actiontaken": "SR Created", "createddate": "2017-06-28T22:38:44", "lat": "34.0567492", "lng": "-118.29092434"},
{"policeprecinct": "TOPANGA", "requesttype": "Single Streetlight Issue", "address": "6840 N ALABAMA AVE, 91303", "actiontaken": "SR Created", "createddate": "2017-06-28T21:54:54", "lat": "34.19486297", "lng": "-118.59894291"},
{"policeprecinct": "WEST VALLEY", "requesttype": "Single Streetlight Issue", "address": "18741 W ELKWOOD ST, 91335", "actiontaken": "SR Created", "createddate": "2017-06-28T21:43:10", "lat": "34.21297573", "lng": "-118.54145535"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Single Streetlight Issue", "address": "8710 N INDEPENDENCE AVE, 91304", "actiontaken": "SR Created", "createddate": "2017-06-28T16:54:10", "lat": "34.22829434", "lng": "-118.590564859999"},
{"policeprecinct": "NORTHEAST", "requesttype": "Single Streetlight Issue", "address": "3049 W ANGUS ST, 90039", "actiontaken": "SR Created", "createddate": "2017-06-28T16:47:26", "lat": "34.10594844", "lng": "-118.271625949999"},
{"policeprecinct": "WEST VALLEY", "requesttype": "Single Streetlight Issue", "address": "7060 N ETIWANDA AVE, 91335", "actiontaken": "SR Created", "createddate": "2017-06-28T16:25:48", "lat": "34.19925081", "lng": "-118.53115314"},
{"policeprecinct": "77TH STREET", "requesttype": "Single Streetlight Issue", "address": "7817 S CENTRAL AVE, 90001", "actiontaken": "SR Created", "createddate": "2017-06-28T15:52:42", "lat": "33.96803814", "lng": "-118.256520379999"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Single Streetlight Issue", "address": "1234 S LORENA ST, 90023", "actiontaken": "SR Created", "createddate": "2017-06-28T15:23:18", "lat": "34.02063525", "lng": "-118.20530882"},
{"policeprecinct": "PACIFIC", "requesttype": "Single Streetlight Issue", "address": "14 E BREEZE AVE, 90291", "actiontaken": "SR Created", "createddate": "2017-06-28T14:59:01", "lat": "33.99028007", "lng": "-118.47598877"},
{"policeprecinct": "RAMPART", "requesttype": "Single Streetlight Issue", "address": "354 N RENO ST, 90026", "actiontaken": "SR Created", "createddate": "2017-06-28T14:42:34", "lat": "34.07594052", "lng": "-118.27814"},
{"policeprecinct": "RAMPART", "requesttype": "Single Streetlight Issue", "address": "355 N PARKMAN AVE, 90026", "actiontaken": "SR Created", "createddate": "2017-06-28T14:39:29", "lat": "34.0758455", "lng": "-118.27764968"},
{"policeprecinct": "HARBOR", "requesttype": "Single Streetlight Issue", "address": "2222 S MESA ST, 90731", "actiontaken": "SR Created", "createddate": "2017-06-28T14:21:03", "lat": "33.72405957", "lng": "-118.285704179999"},
]
return arr;}

function m_streetlight_locs(){
var arr = [
{"policeprecinct": "CENTRAL", "requesttype": "Multiple Streetlight Issue", "address": "7TH ST AT HILL ST, 90014", "actiontaken": "SR Created", "createddate": "2017-06-29T07:32:10", "lat": "34.0458992255", "lng": "-118.254490651"},
{"policeprecinct": "CENTRAL", "requesttype": "Multiple Streetlight Issue", "address": "7TH ST AT HILL ST, 90014", "actiontaken": "SR Created", "createddate": "2017-06-29T07:29:50", "lat": "34.0458992255", "lng": "-118.254490651"},
{"policeprecinct": "CENTRAL", "requesttype": "Multiple Streetlight Issue", "address": "6TH ST AT OLIVE ST, 90014", "actiontaken": "SR Created", "createddate": "2017-06-29T07:28:26", "lat": "34.0480280716", "lng": "-118.254222598"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Multiple Streetlight Issue", "address": "10041 N TOPANGA CANYON BLVD, 91311", "actiontaken": "SR Created", "createddate": "2017-06-28T21:17:30", "lat": "34.2526226775", "lng": "-118.606417644"},
{"policeprecinct": "DEVONSHIRE", "requesttype": "Multiple Streetlight Issue", "address": "10041 N TOPANGA CANYON BLVD, 91311", "actiontaken": "SR Created", "createddate": "2017-06-28T21:17:04", "lat": "34.2526226775", "lng": "-118.606417644"},
{"policeprecinct": "RAMPART", "requesttype": "Multiple Streetlight Issue", "address": "377 N DOUGLAS ST, 90026", "actiontaken": "SR Created", "createddate": "2017-06-28T16:21:40", "lat": "34.0667279729", "lng": "-118.257233327"},
{"policeprecinct": "NEWTON", "requesttype": "Multiple Streetlight Issue", "address": "1347 E WALNUT ST, 90011", "actiontaken": "SR Created", "createddate": "2017-06-28T16:05:09", "lat": "34.0231285386", "lng": "-118.249733872"},
{"policeprecinct": "RAMPART", "requesttype": "Multiple Streetlight Issue", "address": "305 N WESTMORELAND AVE, 90004", "actiontaken": "SR Created", "createddate": "2017-06-28T12:49:46", "lat": "34.0766547317", "lng": "-118.288140268"},
{"policeprecinct": "NORTHEAST", "requesttype": "Multiple Streetlight Issue", "address": "1148 N HYPERION AVE, 90029", "actiontaken": "SR Created", "createddate": "2017-06-28T11:44:06", "lat": "34.0928714305", "lng": "-118.278768173"},
{"policeprecinct": "NEWTON", "requesttype": "Multiple Streetlight Issue", "address": "345 E 51ST ST, 90011", "actiontaken": "SR Created", "createddate": "2017-06-28T10:42:38", "lat": "33.9966440578", "lng": "-118.268572955"},
{"policeprecinct": "HARBOR", "requesttype": "Multiple Streetlight Issue", "address": "949 N LAKME AVE, 90744", "actiontaken": "SR Created", "createddate": "2017-06-28T10:09:30", "lat": "33.7827745562", "lng": "-118.259759661"},
{"policeprecinct": "HOLLYWOOD", "requesttype": "Multiple Streetlight Issue", "address": "8650 W FRANKLIN AVE, 90069", "actiontaken": "SR Created", "createddate": "2017-06-28T10:04:25", "lat": "34.0994994085", "lng": "-118.378510449"},
{"policeprecinct": "NEWTON", "requesttype": "Multiple Streetlight Issue", "address": "2516 S GRAND AVE, 90007", "actiontaken": "SR Created", "createddate": "2017-06-28T09:49:21", "lat": "34.0268706331", "lng": "-118.271850608"},
{"policeprecinct": "HOLLENBECK", "requesttype": "Multiple Streetlight Issue", "address": "3961 N VIA MARISOL, 90032", "actiontaken": "SR Created", "createddate": "2017-06-28T08:56:19", "lat": "34.0928671886", "lng": "-118.186490951"},
{"policeprecinct": "TOPANGA", "requesttype": "Multiple Streetlight Issue", "address": "7300 N SALE AVE, 91307", "actiontaken": "SR Created", "createddate": "2017-06-28T08:35:18", "lat": "34.2030151459", "lng": "-118.619399837"},
{"policeprecinct": "WILSHIRE", "requesttype": "Multiple Streetlight Issue", "address": "1226 S KENISTON AVE, 90019", "actiontaken": "SR Created", "createddate": "2017-06-28T07:48:11", "lat": "34.0522145377", "lng": "-118.338033025"},
{"policeprecinct": "PACIFIC", "requesttype": "Multiple Streetlight Issue", "address": "5785 W 76TH ST, 90045", "actiontaken": "SR Created", "createddate": "2017-06-28T07:38:56", "lat": "33.9715000474", "lng": "-118.382960648"},
{"policeprecinct": "FOOTHILL", "requesttype": "Multiple Streetlight Issue", "address": "9948 N MARNICE AVE, 91042", "actiontaken": "SR Created", "createddate": "2017-06-27T16:11:40", "lat": "34.248365521", "lng": "-118.271121758"},
{"policeprecinct": "PACIFIC", "requesttype": "Multiple Streetlight Issue", "address": "2729 S FEDERAL AVE, 90064", "actiontaken": "SR Created", "createddate": "2017-06-27T15:43:36", "lat": "34.0257133193", "lng": "-118.439009867"},
{"policeprecinct": "SOUTHWEST", "requesttype": "Multiple Streetlight Issue", "address": "JEFFERSON BLVD AT ARLINGTON AVE, 90018", "actiontaken": "SR Created", "createddate": "2017-06-27T15:34:42", "lat": "34.0255311772", "lng": "-118.317683483"},
]
return arr;}

