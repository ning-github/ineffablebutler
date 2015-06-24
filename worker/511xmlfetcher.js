var http = require('http');
var express = require('express');
var app = express();
var parseString = require('xml2js').parseString;
var fs = require('fs');
var db = require('./config/db');

var routeCodes = require('../models/routeCodes');


var RouteList = {
  "RTT": {
    "AgencyList": {
      "Agency": {
        "RouteList": {
          "Route": [{
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Richmond District"
              }]
            },
            "_Name": "1-California",
            "_Code": "1"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Pacific Heights"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to General Hospital"
              }]
            },
            "_Name": "10-Townsend",
            "_Code": "10"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Jackson and Van Ness"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Mission District"
              }]
            },
            "_Name": "12-Folsom Pacific",
            "_Code": "12"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Daly City"
              }]
            },
            "_Name": "14-Mission",
            "_Code": "14"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Daly City"
              }]
            },
            "_Name": "14X-Mission Express",
            "_Code": "14X"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Richmond District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Stonestown"
              }]
            },
            "_Name": "18-46th Avenue",
            "_Code": "18"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fishermans Wharf"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Hunters Point"
              }]
            },
            "_Name": "19-Polk",
            "_Code": "19"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fort Mason"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Daly City Station"
              }]
            },
            "_Name": "19th Avenue Rapid",
            "_Code": "28R"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Richmond District"
              }]
            },
            "_Name": "1AX-California A Express",
            "_Code": "1AX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Richmond District"
              }]
            },
            "_Name": "1BX-California B Express",
            "_Code": "1BX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Richmond District"
              }]
            },
            "_Name": "2-Clement",
            "_Code": "2"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Golden Gate Park"
              }]
            },
            "_Name": "21-Hayes",
            "_Code": "21"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Marina District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Potrero Hill"
              }]
            },
            "_Name": "22-Fillmore",
            "_Code": "22"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Bayview District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to San Francisco Zoo"
              }]
            },
            "_Name": "23-Monterey",
            "_Code": "23"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Pacific Heights"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Bayview District"
              }]
            },
            "_Name": "24-Divisadero",
            "_Code": "24"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Jackson and Van Ness"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Mission District"
              }]
            },
            "_Name": "27-Bryant",
            "_Code": "27"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fort Mason"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Daly City Station"
              }]
            },
            "_Name": "28-19th Avenue",
            "_Code": "28"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Richmond District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Bayview District"
              }]
            },
            "_Name": "29-Sunset",
            "_Code": "29"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Pacific Heights"
              }]
            },
            "_Name": "3-Jackson",
            "_Code": "3"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Caltrain"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Marina District"
              }]
            },
            "_Name": "30-Stockton",
            "_Code": "30"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Marina District"
              }]
            },
            "_Name": "30X-Marina Express",
            "_Code": "30X"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Ocean Beach"
              }]
            },
            "_Name": "31-Balboa",
            "_Code": "31"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Ocean Beach"
              }]
            },
            "_Name": "31AX-Balboa A Express",
            "_Code": "31AX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Ocean Beach"
              }]
            },
            "_Name": "31BX-Balboa B Express",
            "_Code": "31BX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Richmond District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to General Hospital"
              }]
            },
            "_Name": "33-Stanyan",
            "_Code": "33"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Castro Station"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Diamond Heights"
              }]
            },
            "_Name": "35-Eureka",
            "_Code": "35"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Forest Hill and Midtown Terrace"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Glen Park Station"
              }]
            },
            "_Name": "36-Teresita",
            "_Code": "36"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Haight-Ashbury District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Twin Peaks"
              }]
            },
            "_Name": "37-Corbett",
            "_Code": "37"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Richmond District"
              }]
            },
            "_Name": "38-Geary",
            "_Code": "38"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Richmond District"
              }]
            },
            "_Name": "38AX-Geary A Express",
            "_Code": "38AX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Richmond District"
              }]
            },
            "_Name": "38BX-Geary B Express",
            "_Code": "38BX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fishermans Wharf"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Telegraph Hill"
              }]
            },
            "_Name": "39-Coit",
            "_Code": "39"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Presidio"
              }]
            },
            "_Name": "41-Union",
            "_Code": "41"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Marina District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Crocker-Amazon District"
              }]
            },
            "_Name": "43-Masonic",
            "_Code": "43"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Richmond District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Hunters Point"
              }]
            },
            "_Name": "44-OShaughnessy",
            "_Code": "44"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Caltrain"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Presidio"
              }]
            },
            "_Name": "45-Union Stockton",
            "_Code": "45"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fishermans Wharf"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Caltrain"
              }]
            },
            "_Name": "47-Van Ness",
            "_Code": "47"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Potrero Hill"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Sunset District"
              }]
            },
            "_Name": "48-Quintara 24th Street",
            "_Code": "48"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fort Mason"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to City College"
              }]
            },
            "_Name": "49-Van Ness Mission",
            "_Code": "49"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Ocean Beach"
              }]
            },
            "_Name": "5-Fulton",
            "_Code": "5"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Forest Hill Station"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Excelsior District"
              }]
            },
            "_Name": "52-Excelsior",
            "_Code": "52"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to The Bayview District"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Daly City"
              }]
            },
            "_Name": "54-Felton",
            "_Code": "54"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to 16th and Mission"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Mission Bay-UCSF"
              }]
            },
            "_Name": "55-16th Street",
            "_Code": "55"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Visitacion Valley"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Candlestick Point"
              }]
            },
            "_Name": "56-Rutland",
            "_Code": "56"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to The Sunset District"
              }]
            },
            "_Name": "6-Parnassus",
            "_Code": "6"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to 9th Avenue and Judah"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to 30th Avenue and Vicente"
              }]
            },
            "_Name": "66-Quintara",
            "_Code": "66"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to 24th Street and Mission"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Alemany Boulevard"
              }]
            },
            "_Name": "67-Bernal Heights",
            "_Code": "67"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown SF"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Marin HeadlandsGG Bridge"
              }]
            },
            "_Name": "76X-Marin Headlands Express",
            "_Code": "76X"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fishermans Wharf"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to City College"
              }]
            },
            "_Name": "8-Shuttle",
            "_Code": "8"
          }, {
            "RouteDirectionList": {
              "RouteDirection": {
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }
            },
            "_Name": "81X-Caltrain Express",
            "_Code": "81X"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Levi Plaza"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Caltrain"
              }]
            },
            "_Name": "82X-Levi Plaza Express",
            "_Code": "82X"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to 9th and Market"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Caltrain Station"
              }]
            },
            "_Name": "83X-Caltrain",
            "_Code": "83X"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Balboa Park Station"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Sickles and Mission"
              }]
            },
            "_Name": "88-Bart Shuttle",
            "_Code": "88"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Chinatown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Visitacion Valley"
              }]
            },
            "_Name": "8AX-Bayshore A Express",
            "_Code": "8AX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fishermans Wharf"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to City College"
              }]
            },
            "_Name": "8BX-Bayshore B Express",
            "_Code": "8BX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Visitacion Valley"
              }]
            },
            "_Name": "9-San Bruno",
            "_Code": "9"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fort Mason"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Visitacion Valley"
              }]
            },
            "_Name": "90-San Bruno Owl",
            "_Code": "90"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to SF State via Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to West Portal via Downtown"
              }]
            },
            "_Name": "91-Owl",
            "_Code": "91"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Van Ness and California"
              }]
            },
            "_Name": "California Cable Car",
            "_Code": "61"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Fishermans Wharf"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Castro Station"
              }]
            },
            "_Name": "F-Market And Wharves",
            "_Code": "F"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Ocean Beach"
              }]
            },
            "_Name": "Fulton Rapid",
            "_Code": "5R"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Transbay Terminal"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to 48th Avenue"
              }]
            },
            "_Name": "Geary Rapid",
            "_Code": "38R"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Sunset District"
              }]
            },
            "_Name": "HaightNoriega",
            "_Code": "7"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Sunset District"
              }]
            },
            "_Name": "HaightNoriega Rapid",
            "_Code": "7R"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Balboa Park Station"
              }]
            },
            "_Name": "J-Church",
            "_Code": "J"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Balboa Park Station"
              }]
            },
            "_Name": "K-Owl",
            "_Code": "K_OWL"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Visitacion Valley via Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Balboa Park Station via Downtown"
              }]
            },
            "_Name": "KT-Ingleside Third Street",
            "_Code": "KT"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to San Francisco Zoo"
              }]
            },
            "_Name": "L-Owl",
            "_Code": "L_OWL"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to San Francisco Zoo"
              }]
            },
            "_Name": "L-Taraval",
            "_Code": "L"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Balboa Park Station"
              }]
            },
            "_Name": "M-Ocean View",
            "_Code": "M"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Balboa Park Station"
              }]
            },
            "_Name": "M-Owl",
            "_Code": "M_OWL"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Daly City"
              }]
            },
            "_Name": "Mission Rapid",
            "_Code": "14R"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Caltrain via Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Ocean Beach via Downtown"
              }]
            },
            "_Name": "N-Judah",
            "_Code": "N"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Ocean Beach"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Ocean Beach"
              }]
            },
            "_Name": "N-Owl",
            "_Code": "N_OWL"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Sunset District"
              }]
            },
            "_Name": "Noriega Express",
            "_Code": "7X"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to  Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Judah Ocean Beach"
              }]
            },
            "_Name": "NX-N Express",
            "_Code": "NX"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to West Portal Station"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Parkmerced"
              }]
            },
            "_Name": "Parkmerced",
            "_Code": "57"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Fishermans Wharf"
              }]
            },
            "_Name": "Powell Hyde Cable Car",
            "_Code": "60"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Fishermans Wharf"
              }]
            },
            "_Name": "Powell Mason Cable Car",
            "_Code": "59"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Downtown"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Visitacion Valley"
              }]
            },
            "_Name": "San Bruno Rapid",
            "_Code": "9R"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Visitacion Valley"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Van Ness and Market"
              }]
            },
            "_Name": "T-Owl",
            "_Code": "T_OWL"
          }, {
            "RouteDirectionList": {
              "RouteDirection": [{
                "_Code": "Inbound",
                "_Name": "Inbound to Transbay Terminal"
              }, {
                "_Code": "Outbound",
                "_Name": "Outbound to Treasure Island"
              }]
            },
            "_Name": "Treasure Island",
            "_Code": "25"
          }]
        },
        "_Name": "SF-MUNI",
        "_HasDirection": "True",
        "_Mode": "Bus"
      }
    }
  }
};

var obj = {};
for (var i = 0; i < RouteList.RTT.AgencyList.Agency.RouteList.Route.length; i++) {
  var shortened = RouteList.RTT.AgencyList.Agency.RouteList.Route[i]._Code
  obj[shortened] = {
    Outbound: {},
    Inbound: {}
  };
}

//run loop to get url to find all stops
var urls = [];
for (var key in obj) {
  urls.push(key + "~Outbound");
  urls.push(key + "~Inbound");
};
var jsonContent = [];

for (var i = 0; i < urls.length; i++) {
  var options = {
    hostname: 'services.my511.org',
    path: '/Transit2.0/GetStopsForRoute.aspx?token=62e8fbd1-9e0e-4a3c-a906-d5d860daeb83&routeIDF=SF-MUNI~' + urls[i]
  }

  var xmlReq = http.get(options, function (response) {
    var completeResponse = "";
    response.on('data', function (chunk) {
      completeResponse += chunk;
    });
    response.on('end', function () {
      parseString(completeResponse, function (err, result) {
        jsonContent.push(result);
        // saveJsonToDb(result);
      });
    }).on('error', function (e) {
      console.log('problem with request');
    });
  });

}


var saveJsonToDb = function (json) {
  if (json.RTT) {

    var path = json.RTT.AgencyList[0].Agency[0].RouteList[0].Route[0];
    var pathStop = path.RouteDirectionList[0].RouteDirection[0].StopList[0].Stop;
    var stops = [];
    for (var i = 0; i < pathStop.length; i++) {
      console.log(pathStop[i].$)
      stops.push(pathStop[i].$);
    }

    var routeA = new routeCodes({
      routeName: path.$.Code,
      routeDir: path.RouteDirectionList[0].RouteDirection[0].$.Code,
      routeStop: stops
    });
    console.log("json...................................", routeA);
    routeA.save(function (err, route) {
      if (err) console.log('err', err);
      console.log("ROUTE...........",route);
    });


  }

}