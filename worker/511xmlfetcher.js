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









// //JSON OBJECTS
// var route1Outbound = {
//     "RTT": {
//         "AgencyList": {
//             "Agency": {
//                 "RouteList": {
//                     "Route": {
//                         "RouteDirectionList": {
//                             "RouteDirection": {
//                                 "StopList": {
//                                     "Stop": [
//                                         {
//                                             "_name": "32nd Ave and California St",
//                                             "_StopCode": "13547"
//                                         },
//                                         {
//                                             "_name": "32nd Ave and Clement St",
//                                             "_StopCode": "13549"
//                                         },
//                                         {
//                                             "_name": "32nd Ave and Geary Blvd",
//                                             "_StopCode": "13550"
//                                         },
//                                         {
//                                             "_name": "California St and 4th Ave",
//                                             "_StopCode": "13822"
//                                         },
//                                         {
//                                             "_name": "California St and 6th Ave",
//                                             "_StopCode": "13824"
//                                         },
//                                         {
//                                             "_name": "California St and 10th Ave",
//                                             "_StopCode": "13828"
//                                         },
//                                         {
//                                             "_name": "California St and 12th Ave",
//                                             "_StopCode": "13831"
//                                         },
//                                         {
//                                             "_name": "California St and 16th Ave",
//                                             "_StopCode": "13833"
//                                         },
//                                         {
//                                             "_name": "California St and 19th Ave",
//                                             "_StopCode": "13835"
//                                         },
//                                         {
//                                             "_name": "California St and 22nd Ave",
//                                             "_StopCode": "13837"
//                                         },
//                                         {
//                                             "_name": "California St and 25th Ave",
//                                             "_StopCode": "13839"
//                                         },
//                                         {
//                                             "_name": "California St and 28th Ave",
//                                             "_StopCode": "13841"
//                                         },
//                                         {
//                                             "_name": "California St and 30th Ave",
//                                             "_StopCode": "13843"
//                                         },
//                                         {
//                                             "_name": "California St and Arguello Blvd",
//                                             "_StopCode": "13845"
//                                         },
//                                         {
//                                             "_name": "California St and Baker St",
//                                             "_StopCode": "13847"
//                                         },
//                                         {
//                                             "_name": "California St and Cherry St",
//                                             "_StopCode": "13852"
//                                         },
//                                         {
//                                             "_name": "California St and Divisadero St",
//                                             "_StopCode": "13858"
//                                         },
//                                         {
//                                             "_name": "California St and Laurel St",
//                                             "_StopCode": "13875"
//                                         },
//                                         {
//                                             "_name": "California St and Maple St",
//                                             "_StopCode": "13879"
//                                         },
//                                         {
//                                             "_name": "California St and Pierce St",
//                                             "_StopCode": "13884"
//                                         },
//                                         {
//                                             "_name": "California St and Park Presidio Blvd",
//                                             "_StopCode": "13886"
//                                         },
//                                         {
//                                             "_name": "California St and Presidio Ave",
//                                             "_StopCode": "13892"
//                                         },
//                                         {
//                                             "_name": "California St and Spruce St",
//                                             "_StopCode": "13896"
//                                         },
//                                         {
//                                             "_name": "Clay St and Drumm St",
//                                             "_StopCode": "14015"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Battery St",
//                                             "_StopCode": "16290"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Buchanan St",
//                                             "_StopCode": "16291"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Davis St",
//                                             "_StopCode": "16294"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Fillmore St",
//                                             "_StopCode": "16295"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Franklin St",
//                                             "_StopCode": "16297"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Gough St",
//                                             "_StopCode": "16298"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Grant Ave",
//                                             "_StopCode": "16299"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Hyde St",
//                                             "_StopCode": "16300"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Jones St",
//                                             "_StopCode": "16301"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Kearny St",
//                                             "_StopCode": "16302"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Larkin St",
//                                             "_StopCode": "16303"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Leavenworth St",
//                                             "_StopCode": "16304"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Laguna St",
//                                             "_StopCode": "16305"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Montgomery St",
//                                             "_StopCode": "16307"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Octavia St",
//                                             "_StopCode": "16309"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Polk St",
//                                             "_StopCode": "16311"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Powell St",
//                                             "_StopCode": "16312"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Sansome St",
//                                             "_StopCode": "16314"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Sproule Ln",
//                                             "_StopCode": "16315"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Stockton St",
//                                             "_StopCode": "16316"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Van Ness Ave",
//                                             "_StopCode": "16317"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Webster St",
//                                             "_StopCode": "16319"
//                                         },
//                                         {
//                                             "_name": "Steiner St and California St",
//                                             "_StopCode": "16486"
//                                         },
//                                         {
//                                             "_name": "California St and 8th Ave",
//                                             "_StopCode": "17160"
//                                         }
//                                     ]
//                                 },
//                                 "_Code": "Outbound",
//                                 "_Name": "Outbound to The Richmond District"
//                             }
//                         },
//                         "_Name": "1-California",
//                         "_Code": "1"
//                     }
//                 },
//                 "_Name": "SF-MUNI",
//                 "_HasDirection": "True",
//                 "_Mode": "Bus"
//             }
//         }
//     }
// };

// var route1Inbound = {
//     "RTT": {
//         "AgencyList": {
//             "Agency": {
//                 "RouteList": {
//                     "Route": {
//                         "RouteDirectionList": {
//                             "RouteDirection": {
//                                 "StopList": {
//                                     "Stop": [
//                                         {
//                                             "_name": "32nd Ave and California St",
//                                             "_StopCode": "13546"
//                                         },
//                                         {
//                                             "_name": "32nd Ave and Clement St",
//                                             "_StopCode": "13548"
//                                         },
//                                         {
//                                             "_name": "33rd Ave and Clement St",
//                                             "_StopCode": "13555"
//                                         },
//                                         {
//                                             "_name": "California St and 4th Ave",
//                                             "_StopCode": "13823"
//                                         },
//                                         {
//                                             "_name": "California St and 6th Ave",
//                                             "_StopCode": "13825"
//                                         },
//                                         {
//                                             "_name": "California St and 8th Ave",
//                                             "_StopCode": "13827"
//                                         },
//                                         {
//                                             "_name": "California St and 10th Ave",
//                                             "_StopCode": "13830"
//                                         },
//                                         {
//                                             "_name": "California St and 12th Ave",
//                                             "_StopCode": "13832"
//                                         },
//                                         {
//                                             "_name": "California St and 16th Ave",
//                                             "_StopCode": "13834"
//                                         },
//                                         {
//                                             "_name": "California St and 19th Ave",
//                                             "_StopCode": "13836"
//                                         },
//                                         {
//                                             "_name": "California St and 22nd Ave",
//                                             "_StopCode": "13838"
//                                         },
//                                         {
//                                             "_name": "California St and 25th Ave",
//                                             "_StopCode": "13840"
//                                         },
//                                         {
//                                             "_name": "California St and 28th Ave",
//                                             "_StopCode": "13842"
//                                         },
//                                         {
//                                             "_name": "California St and 30th Ave",
//                                             "_StopCode": "13844"
//                                         },
//                                         {
//                                             "_name": "California St and Arguello Blvd",
//                                             "_StopCode": "13846"
//                                         },
//                                         {
//                                             "_name": "California St and Baker St",
//                                             "_StopCode": "13848"
//                                         },
//                                         {
//                                             "_name": "California St and Cherry St",
//                                             "_StopCode": "13853"
//                                         },
//                                         {
//                                             "_name": "California St and Divisadero St",
//                                             "_StopCode": "13859"
//                                         },
//                                         {
//                                             "_name": "California St and Laurel St",
//                                             "_StopCode": "13876"
//                                         },
//                                         {
//                                             "_name": "California St and Pierce St",
//                                             "_StopCode": "13885"
//                                         },
//                                         {
//                                             "_name": "California St and Park Presidio Blvd",
//                                             "_StopCode": "13887"
//                                         },
//                                         {
//                                             "_name": "California St and Presidio Ave",
//                                             "_StopCode": "13893"
//                                         },
//                                         {
//                                             "_name": "California St and Spruce St",
//                                             "_StopCode": "13897"
//                                         },
//                                         {
//                                             "_name": "Clay St and Franklin St",
//                                             "_StopCode": "14016"
//                                         },
//                                         {
//                                             "_name": "Clay St and Front St",
//                                             "_StopCode": "14017"
//                                         },
//                                         {
//                                             "_name": "Clay St and Grant Ave",
//                                             "_StopCode": "14018"
//                                         },
//                                         {
//                                             "_name": "Clay St and Hyde St",
//                                             "_StopCode": "14019"
//                                         },
//                                         {
//                                             "_name": "Clay St and Jones St",
//                                             "_StopCode": "14020"
//                                         },
//                                         {
//                                             "_name": "Clay St and Kearny St",
//                                             "_StopCode": "14021"
//                                         },
//                                         {
//                                             "_name": "Clay St and Larkin St",
//                                             "_StopCode": "14022"
//                                         },
//                                         {
//                                             "_name": "Clay St and Leavenworth St",
//                                             "_StopCode": "14023"
//                                         },
//                                         {
//                                             "_name": "Clay St and Mason St",
//                                             "_StopCode": "14024"
//                                         },
//                                         {
//                                             "_name": "Clay St and Montgomery St",
//                                             "_StopCode": "14025"
//                                         },
//                                         {
//                                             "_name": "Clay St and Polk St",
//                                             "_StopCode": "14026"
//                                         },
//                                         {
//                                             "_name": "Clay St and Powell St",
//                                             "_StopCode": "14027"
//                                         },
//                                         {
//                                             "_name": "Clay St and Sansome St",
//                                             "_StopCode": "14028"
//                                         },
//                                         {
//                                             "_name": "Clay St and Stockton St",
//                                             "_StopCode": "14029"
//                                         },
//                                         {
//                                             "_name": "Clay St and Taylor St",
//                                             "_StopCode": "14030"
//                                         },
//                                         {
//                                             "_name": "Clay St and Van Ness Ave",
//                                             "_StopCode": "14031"
//                                         },
//                                         {
//                                             "_name": "Geary Blvd and 33rd Ave",
//                                             "_StopCode": "14277"
//                                         },
//                                         {
//                                             "_name": "Gough St and Sacramento St",
//                                             "_StopCode": "14905"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Buchanan St",
//                                             "_StopCode": "16292"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Fillmore St",
//                                             "_StopCode": "16296"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Laguna St",
//                                             "_StopCode": "16306"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Octavia St",
//                                             "_StopCode": "16310"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Webster St",
//                                             "_StopCode": "16320"
//                                         },
//                                         {
//                                             "_name": "Steiner St and Sacramento St",
//                                             "_StopCode": "16489"
//                                         }
//                                     ]
//                                 },
//                                 "_Code": "Inbound",
//                                 "_Name": "Inbound to Downtown"
//                             }
//                         },
//                         "_Name": "1-California",
//                         "_Code": "1"
//                     }
//                 },
//                 "_Name": "SF-MUNI",
//                 "_HasDirection": "True",
//                 "_Mode": "Bus"
//             }
//         }
//     }
// };

// var route2Outbound = {
//     "RTT": {
//         "AgencyList": {
//             "Agency": {
//                 "RouteList": {
//                     "Route": {
//                         "RouteDirectionList": {
//                             "RouteDirection": {
//                                 "StopList": {
//                                     "Stop": [
//                                         {
//                                             "_name": "Arguello Blvd and California St",
//                                             "_StopCode": "13644"
//                                         },
//                                         {
//                                             "_name": "California St and Cherry St",
//                                             "_StopCode": "13852"
//                                         },
//                                         {
//                                             "_name": "California St and Laurel St",
//                                             "_StopCode": "13875"
//                                         },
//                                         {
//                                             "_name": "California St and Maple St",
//                                             "_StopCode": "13879"
//                                         },
//                                         {
//                                             "_name": "California St and Presidio Ave",
//                                             "_StopCode": "13892"
//                                         },
//                                         {
//                                             "_name": "California St and Spruce St",
//                                             "_StopCode": "13896"
//                                         },
//                                         {
//                                             "_name": "Clement St and 4th Ave",
//                                             "_StopCode": "14040"
//                                         },
//                                         {
//                                             "_name": "Clement St and 6th Ave",
//                                             "_StopCode": "14042"
//                                         },
//                                         {
//                                             "_name": "Clement St and 10th Ave",
//                                             "_StopCode": "14045"
//                                         },
//                                         {
//                                             "_name": "Clement St and 12th Ave",
//                                             "_StopCode": "14047"
//                                         },
//                                         {
//                                             "_name": "Market St and Drumm St",
//                                             "_StopCode": "15669"
//                                         },
//                                         {
//                                             "_name": "Market St and Front St",
//                                             "_StopCode": "15671"
//                                         },
//                                         {
//                                             "_name": "Presidio Ave and Pine St",
//                                             "_StopCode": "16096"
//                                         },
//                                         {
//                                             "_name": "Presidio Ave and Sutter St",
//                                             "_StopCode": "16098"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Baker St",
//                                             "_StopCode": "16585"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Buchanan St",
//                                             "_StopCode": "16587"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Divisadero St",
//                                             "_StopCode": "16589"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Fillmore St",
//                                             "_StopCode": "16591"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Gough St",
//                                             "_StopCode": "16593"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Hyde St",
//                                             "_StopCode": "16594"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Jones St",
//                                             "_StopCode": "16595"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Kearny St",
//                                             "_StopCode": "16596"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Larkin St",
//                                             "_StopCode": "16597"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Leavenworth St",
//                                             "_StopCode": "16598"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Laguna St",
//                                             "_StopCode": "16599"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Mason St",
//                                             "_StopCode": "16601"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Octavia St",
//                                             "_StopCode": "16602"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Polk St",
//                                             "_StopCode": "16603"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Powell St",
//                                             "_StopCode": "16604"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Sansome St",
//                                             "_StopCode": "16606"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Scott St",
//                                             "_StopCode": "16607"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Steiner St",
//                                             "_StopCode": "16609"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Stockton St",
//                                             "_StopCode": "16611"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Taylor St",
//                                             "_StopCode": "16612"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Van Ness Ave",
//                                             "_StopCode": "16613"
//                                         },
//                                         {
//                                             "_name": "Clement St and 8th Ave",
//                                             "_StopCode": "17019"
//                                         },
//                                         {
//                                             "_name": "Market and Steuart",
//                                             "_StopCode": "17227"
//                                         },
//                                         {
//                                             "_name": "Clement St and Arguello Blvd",
//                                             "_StopCode": "17250"
//                                         }
//                                     ]
//                                 },
//                                 "_Code": "Outbound",
//                                 "_Name": "Outbound to The Richmond District"
//                             }
//                         },
//                         "_Name": "2-Clement",
//                         "_Code": "2"
//                     }
//                 },
//                 "_Name": "SF-MUNI",
//                 "_HasDirection": "True",
//                 "_Mode": "Bus"
//             }
//         }
//     }
// };

// var route2Inbound = {
//     "RTT": {
//         "AgencyList": {
//             "Agency": {
//                 "RouteList": {
//                     "Route": {
//                         "RouteDirectionList": {
//                             "RouteDirection": {
//                                 "StopList": {
//                                     "Stop": [
//                                         {
//                                             "_name": "Arguello Blvd and Euclid Ave",
//                                             "_StopCode": "13647"
//                                         },
//                                         {
//                                             "_name": "Bush St and Montgomery St",
//                                             "_StopCode": "13815"
//                                         },
//                                         {
//                                             "_name": "California St and Arguello Blvd",
//                                             "_StopCode": "13846"
//                                         },
//                                         {
//                                             "_name": "California St and Cherry St",
//                                             "_StopCode": "13853"
//                                         },
//                                         {
//                                             "_name": "California St and Laurel St",
//                                             "_StopCode": "13876"
//                                         },
//                                         {
//                                             "_name": "California St and Presidio Ave",
//                                             "_StopCode": "13893"
//                                         },
//                                         {
//                                             "_name": "California St and Spruce St",
//                                             "_StopCode": "13897"
//                                         },
//                                         {
//                                             "_name": "Clement St and 2nd Ave",
//                                             "_StopCode": "14039"
//                                         },
//                                         {
//                                             "_name": "Clement St and 4th Ave",
//                                             "_StopCode": "14041"
//                                         },
//                                         {
//                                             "_name": "Clement St and 6th Ave",
//                                             "_StopCode": "14043"
//                                         },
//                                         {
//                                             "_name": "Clement St and 8th Ave",
//                                             "_StopCode": "14044"
//                                         },
//                                         {
//                                             "_name": "Clement St and 10th Ave",
//                                             "_StopCode": "14046"
//                                         },
//                                         {
//                                             "_name": "Clement St and 12th Ave",
//                                             "_StopCode": "14048"
//                                         },
//                                         {
//                                             "_name": "Kearny St and Sutter St",
//                                             "_StopCode": "14826"
//                                         },
//                                         {
//                                             "_name": "Market St and Beale St",
//                                             "_StopCode": "15658"
//                                         },
//                                         {
//                                             "_name": "Post St and Larkin St",
//                                             "_StopCode": "16016"
//                                         },
//                                         {
//                                             "_name": "Post St and Leavenworth St",
//                                             "_StopCode": "16017"
//                                         },
//                                         {
//                                             "_name": "Post St and Laguna St",
//                                             "_StopCode": "16018"
//                                         },
//                                         {
//                                             "_name": "Post St and Montgomery St",
//                                             "_StopCode": "16019"
//                                         },
//                                         {
//                                             "_name": "Post St and Octavia St",
//                                             "_StopCode": "16020"
//                                         },
//                                         {
//                                             "_name": "Post St and Polk St",
//                                             "_StopCode": "16021"
//                                         },
//                                         {
//                                             "_name": "Post St and Powell St",
//                                             "_StopCode": "16022"
//                                         },
//                                         {
//                                             "_name": "Post St and Taylor St",
//                                             "_StopCode": "16023"
//                                         },
//                                         {
//                                             "_name": "Post St and Van Ness Ave",
//                                             "_StopCode": "16024"
//                                         },
//                                         {
//                                             "_name": "Presidio Ave and Pine St",
//                                             "_StopCode": "16097"
//                                         },
//                                         {
//                                             "_name": "Post St and Gough St",
//                                             "_StopCode": "16124"
//                                         },
//                                         {
//                                             "_name": "Post St and Grant Ave",
//                                             "_StopCode": "16125"
//                                         },
//                                         {
//                                             "_name": "Post St and Hyde St",
//                                             "_StopCode": "16126"
//                                         },
//                                         {
//                                             "_name": "Post St and Jones St",
//                                             "_StopCode": "16127"
//                                         },
//                                         {
//                                             "_name": "Spear and Market St",
//                                             "_StopCode": "16475"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Baker St",
//                                             "_StopCode": "16586"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Buchanan St",
//                                             "_StopCode": "16588"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Divisadero St",
//                                             "_StopCode": "16590"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Fillmore St",
//                                             "_StopCode": "16592"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Laguna St",
//                                             "_StopCode": "16600"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Presidio Ave",
//                                             "_StopCode": "16605"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Scott St",
//                                             "_StopCode": "16608"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Steiner St",
//                                             "_StopCode": "16610"
//                                         },
//                                         {
//                                             "_name": "Market St and 1st St",
//                                             "_StopCode": "17264"
//                                         },
//                                         {
//                                             "_name": "Clement and 14 Ave",
//                                             "_StopCode": "17543"
//                                         }
//                                     ]
//                                 },
//                                 "_Code": "Inbound",
//                                 "_Name": "Inbound to Downtown"
//                             }
//                         },
//                         "_Name": "2-Clement",
//                         "_Code": "2"
//                     }
//                 },
//                 "_Name": "SF-MUNI",
//                 "_HasDirection": "True",
//                 "_Mode": "Bus"
//             }
//         }
//     }
// };

// var route3Outbound = {
//     "RTT": {
//         "AgencyList": {
//             "Agency": {
//                 "RouteList": {
//                     "Route": {
//                         "RouteDirectionList": {
//                             "RouteDirection": {
//                                 "StopList": {
//                                     "Stop": [
//                                         {
//                                             "_name": "Fillmore St and Pine St",
//                                             "_StopCode": "14635"
//                                         },
//                                         {
//                                             "_name": "Fillmore St and Sacramento St",
//                                             "_StopCode": "14638"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Baker St",
//                                             "_StopCode": "15142"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Divisadero St",
//                                             "_StopCode": "15145"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Fillmore St",
//                                             "_StopCode": "15147"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Presidio Ave",
//                                             "_StopCode": "15159"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Scott St",
//                                             "_StopCode": "15160"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Steiner St",
//                                             "_StopCode": "15162"
//                                         },
//                                         {
//                                             "_name": "Presidio Ave and Clay St",
//                                             "_StopCode": "16090"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Buchanan St",
//                                             "_StopCode": "16587"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Fillmore St",
//                                             "_StopCode": "16591"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Gough St",
//                                             "_StopCode": "16593"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Hyde St",
//                                             "_StopCode": "16594"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Jones St",
//                                             "_StopCode": "16595"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Kearny St",
//                                             "_StopCode": "16596"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Larkin St",
//                                             "_StopCode": "16597"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Leavenworth St",
//                                             "_StopCode": "16598"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Laguna St",
//                                             "_StopCode": "16599"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Mason St",
//                                             "_StopCode": "16601"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Octavia St",
//                                             "_StopCode": "16602"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Polk St",
//                                             "_StopCode": "16603"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Powell St",
//                                             "_StopCode": "16604"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Sansome St",
//                                             "_StopCode": "16606"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Stockton St",
//                                             "_StopCode": "16611"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Taylor St",
//                                             "_StopCode": "16612"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Van Ness Ave",
//                                             "_StopCode": "16613"
//                                         }
//                                     ]
//                                 },
//                                 "_Code": "Outbound",
//                                 "_Name": "Outbound to Pacific Heights"
//                             }
//                         },
//                         "_Name": "3-Jackson",
//                         "_Code": "3"
//                     }
//                 },
//                 "_Name": "SF-MUNI",
//                 "_HasDirection": "True",
//                 "_Mode": "Bus"
//             }
//         }
//     }
// };

// var route3Inbound = {
//     "RTT": {
//         "AgencyList": {
//             "Agency": {
//                 "RouteList": {
//                     "Route": {
//                         "RouteDirectionList": {
//                             "RouteDirection": {
//                                 "StopList": {
//                                     "Stop": [
//                                         {
//                                             "_name": "Bush St and Montgomery St",
//                                             "_StopCode": "13815"
//                                         },
//                                         {
//                                             "_name": "Fillmore St and Jackson St",
//                                             "_StopCode": "14624"
//                                         },
//                                         {
//                                             "_name": "Fillmore St and Pine St",
//                                             "_StopCode": "14636"
//                                         },
//                                         {
//                                             "_name": "Fillmore St and Sacramento St",
//                                             "_StopCode": "14637"
//                                         },
//                                         {
//                                             "_name": "Kearny St and Sutter St",
//                                             "_StopCode": "14826"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Baker St",
//                                             "_StopCode": "15143"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Divisadero St",
//                                             "_StopCode": "15146"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Scott St",
//                                             "_StopCode": "15161"
//                                         },
//                                         {
//                                             "_name": "Jackson St and Steiner St",
//                                             "_StopCode": "15163"
//                                         },
//                                         {
//                                             "_name": "Post St and Larkin St",
//                                             "_StopCode": "16016"
//                                         },
//                                         {
//                                             "_name": "Post St and Leavenworth St",
//                                             "_StopCode": "16017"
//                                         },
//                                         {
//                                             "_name": "Post St and Laguna St",
//                                             "_StopCode": "16018"
//                                         },
//                                         {
//                                             "_name": "Post St and Octavia St",
//                                             "_StopCode": "16020"
//                                         },
//                                         {
//                                             "_name": "Post St and Polk St",
//                                             "_StopCode": "16021"
//                                         },
//                                         {
//                                             "_name": "Post St and Powell St",
//                                             "_StopCode": "16022"
//                                         },
//                                         {
//                                             "_name": "Post St and Taylor St",
//                                             "_StopCode": "16023"
//                                         },
//                                         {
//                                             "_name": "Post St and Van Ness Ave",
//                                             "_StopCode": "16024"
//                                         },
//                                         {
//                                             "_name": "Presidio Ave and California St",
//                                             "_StopCode": "16089"
//                                         },
//                                         {
//                                             "_name": "Presidio Ave and Clay St",
//                                             "_StopCode": "16091"
//                                         },
//                                         {
//                                             "_name": "Presidio Ave and Jackson St",
//                                             "_StopCode": "16095"
//                                         },
//                                         {
//                                             "_name": "Post St and Gough St",
//                                             "_StopCode": "16124"
//                                         },
//                                         {
//                                             "_name": "Post St and Grant Ave",
//                                             "_StopCode": "16125"
//                                         },
//                                         {
//                                             "_name": "Post St and Hyde St",
//                                             "_StopCode": "16126"
//                                         },
//                                         {
//                                             "_name": "Post St and Jones St",
//                                             "_StopCode": "16127"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Presidio Ave",
//                                             "_StopCode": "16313"
//                                         },
//                                         {
//                                             "_name": "Sacramento St and Walnut St",
//                                             "_StopCode": "16318"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Buchanan St",
//                                             "_StopCode": "16588"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Fillmore St",
//                                             "_StopCode": "16592"
//                                         },
//                                         {
//                                             "_name": "Sutter St and Laguna St",
//                                             "_StopCode": "16600"
//                                         },
//                                         {
//                                             "_name": "Walnut St and California St",
//                                             "_StopCode": "16906"
//                                         }
//                                     ]
//                                 },
//                                 "_Code": "Inbound",
//                                 "_Name": "Inbound to Downtown"
//                             }
//                         },
//                         "_Name": "3-Jackson",
//                         "_Code": "3"
//                     }
//                 },
//                 "_Name": "SF-MUNI",
//                 "_HasDirection": "True",
//                 "_Mode": "Bus"
//             }
//         }
//     }
// };

// var route5Outbound = {
//     "RTT": {
//         "AgencyList": {
//             "Agency": {
//                 "RouteList": {
//                     "Route": {
//                         "RouteDirectionList": {
//                             "RouteDirection": {
//                                 "StopList": {
//                                     "Stop": [
//                                         {
//                                             "_name": "6th Ave and Fulton St",
//                                             "_StopCode": "13183"
//                                         },
//                                         {
//                                             "_name": "8th Ave and Cabrillo St",
//                                             "_StopCode": "13200"
//                                         },
//                                         {
//                                             "_name": "Cabrillo St and 6th Ave",
//                                             "_StopCode": "13923"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 33rd Ave",
//                                             "_StopCode": "14211"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 36th Ave",
//                                             "_StopCode": "14213"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 46th Ave",
//                                             "_StopCode": "14221"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Arguello Blvd",
//                                             "_StopCode": "14223"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Clayton St",
//                                             "_StopCode": "14225"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Masonic Ave",
//                                             "_StopCode": "14229"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Park Presidio Blvd",
//                                             "_StopCode": "14231"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Parker Ave",
//                                             "_StopCode": "14233"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Stanyan St",
//                                             "_StopCode": "14236"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 4th Ave",
//                                             "_StopCode": "14730"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 6th Ave",
//                                             "_StopCode": "14732"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 8th Ave",
//                                             "_StopCode": "14734"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 10th Ave",
//                                             "_StopCode": "14736"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 18th Ave",
//                                             "_StopCode": "14742"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 22nd Ave",
//                                             "_StopCode": "14746"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 25th Ave",
//                                             "_StopCode": "14748"
//                                         },
//                                         {
//                                             "_name": "La Playa St and Cabrillo St",
//                                             "_StopCode": "14842"
//                                         },
//                                         {
//                                             "_name": "La Playa St and Fulton St",
//                                             "_StopCode": "14844"
//                                         },
//                                         {
//                                             "_name": "Howard St and Main St",
//                                             "_StopCode": "15056"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Baker St",
//                                             "_StopCode": "15384"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Divisadero St",
//                                             "_StopCode": "15389"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Fillmore St",
//                                             "_StopCode": "15391"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Gough St",
//                                             "_StopCode": "15393"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Hyde St",
//                                             "_StopCode": "15395"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Larkin St",
//                                             "_StopCode": "15397"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Laguna St",
//                                             "_StopCode": "15398"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Pierce St",
//                                             "_StopCode": "15400"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Van Ness Ave",
//                                             "_StopCode": "15404"
//                                         },
//                                         {
//                                             "_name": "Market St and Front St",
//                                             "_StopCode": "15671"
//                                         },
//                                         {
//                                             "_name": "Market St and Grant Ave",
//                                             "_StopCode": "15674"
//                                         },
//                                         {
//                                             "_name": "Market St and Mason St",
//                                             "_StopCode": "15683"
//                                         },
//                                         {
//                                             "_name": "Market St and Montgomery St",
//                                             "_StopCode": "15684"
//                                         },
//                                         {
//                                             "_name": "Market St and Powell St",
//                                             "_StopCode": "15688"
//                                         },
//                                         {
//                                             "_name": "Market St and Sansome St",
//                                             "_StopCode": "15689"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Jones",
//                                             "_StopCode": "17563"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Lyon Ave",
//                                             "_StopCode": "17726"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 28ave",
//                                             "_StopCode": "17727"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 30th Ave",
//                                             "_StopCode": "17728"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 40th Ave",
//                                             "_StopCode": "17729"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 43rd Ave",
//                                             "_StopCode": "17730"
//                                         }
//                                     ]
//                                 },
//                                 "_Code": "Outbound",
//                                 "_Name": "Outbound to Ocean Beach"
//                             }
//                         },
//                         "_Name": "5-Fulton",
//                         "_Code": "5"
//                     }
//                 },
//                 "_Name": "SF-MUNI",
//                 "_HasDirection": "True",
//                 "_Mode": "Bus"
//             }
//         }
//     }
// };

// var route5Inbound = {
//     "RTT": {
//         "AgencyList": {
//             "Agency": {
//                 "RouteList": {
//                     "Route": {
//                         "RouteDirectionList": {
//                             "RouteDirection": {
//                                 "StopList": {
//                                     "Stop": [
//                                         {
//                                             "_name": "Beale St and Mission St",
//                                             "_StopCode": "13089"
//                                         },
//                                         {
//                                             "_name": "Cabrillo St and La Playa St",
//                                             "_StopCode": "13927"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 33rd Ave",
//                                             "_StopCode": "14212"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 37th Ave",
//                                             "_StopCode": "14215"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 40th Ave",
//                                             "_StopCode": "14218"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 46th Ave",
//                                             "_StopCode": "14222"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Arguello Blvd",
//                                             "_StopCode": "14224"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Clayton St",
//                                             "_StopCode": "14226"
//                                         },
//                                         {
//                                             "_name": "Fulton St and La Playa St",
//                                             "_StopCode": "14228"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Masonic Ave",
//                                             "_StopCode": "14230"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Park Presidio",
//                                             "_StopCode": "14232"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Shrader St",
//                                             "_StopCode": "14234"
//                                         },
//                                         {
//                                             "_name": "Fulton St and Stanyan St",
//                                             "_StopCode": "14235"
//                                         },
//                                         {
//                                             "_name": "Golden Gate Ave and Hyde St",
//                                             "_StopCode": "14239"
//                                         },
//                                         {
//                                             "_name": "Golden Gate and Leavenworth St",
//                                             "_StopCode": "14241"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 4th Ave",
//                                             "_StopCode": "14731"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 6th Ave",
//                                             "_StopCode": "14733"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 8th Ave",
//                                             "_StopCode": "14735"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 10th Ave",
//                                             "_StopCode": "14737"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 22nd Ave",
//                                             "_StopCode": "14747"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 25th Ave",
//                                             "_StopCode": "14749"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 28th Ave",
//                                             "_StopCode": "14751"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 30th Ave",
//                                             "_StopCode": "14753"
//                                         },
//                                         {
//                                             "_name": "La Playa St and Cabrillo St",
//                                             "_StopCode": "14843"
//                                         },
//                                         {
//                                             "_name": "Larkin St and McAllister St",
//                                             "_StopCode": "14850"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Baker St",
//                                             "_StopCode": "15385"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Divisadero St",
//                                             "_StopCode": "15390"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Fillmore St",
//                                             "_StopCode": "15392"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Gough St",
//                                             "_StopCode": "15394"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Hyde St",
//                                             "_StopCode": "15396"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Laguna St",
//                                             "_StopCode": "15399"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Pierce St",
//                                             "_StopCode": "15401"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Van Ness Ave",
//                                             "_StopCode": "15405"
//                                         },
//                                         {
//                                             "_name": "Market St and 1st St",
//                                             "_StopCode": "15638"
//                                         },
//                                         {
//                                             "_name": "Market St and 3rd St",
//                                             "_StopCode": "15641"
//                                         },
//                                         {
//                                             "_name": "Market Between 4th and 3rd St",
//                                             "_StopCode": "15642"
//                                         },
//                                         {
//                                             "_name": "Market Between 5th and 4th St",
//                                             "_StopCode": "15644"
//                                         },
//                                         {
//                                             "_name": "Market Between 5th and 6th St",
//                                             "_StopCode": "15646"
//                                         },
//                                         {
//                                             "_name": "Market Between 6th and 7th",
//                                             "_StopCode": "15648"
//                                         },
//                                         {
//                                             "_name": "McAllister and Leavenworth St",
//                                             "_StopCode": "17635"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 43rd Ave",
//                                             "_StopCode": "17720"
//                                         },
//                                         {
//                                             "_name": "Fulton St and 18th Ave",
//                                             "_StopCode": "17721"
//                                         },
//                                         {
//                                             "_name": "McAllister St and Lyon St",
//                                             "_StopCode": "17735"
//                                         }
//                                     ]
//                                 },
//                                 "_Code": "Inbound",
//                                 "_Name": "Inbound to Downtown"
//                             }
//                         },
//                         "_Name": "5-Fulton",
//                         "_Code": "5"
//                     }
//                 },
//                 "_Name": "SF-MUNI",
//                 "_HasDirection": "True",
//                 "_Mode": "Bus"
//             }
//         }
//     }
// };





//   fiveEleven.APItoken = 'e04385aa-cdb9-4f5b-9d78-9c7e0dcb7260';
//   fiveEleven.routeCode = '38R';
//   fiveEleven.direction = 'Inbound';

//   fiveEleven.APIEndpoints = {
//     routes: 'http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx?token=' + fiveEleven.APItoken + '&agencyName=SF-MUNI',

//     stopCodes: 'http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?token='+ fiveEleven.APItoken +'&routeIDF=SF-MUNI~'+ fiveEleven.routeCode + '~' + fiveEleven.direction,

//     nextDepartures: 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=' + fiveEleven.APItoken + '&stopCode=' + fiveEleven.stopCode
//   };


//   return fiveEleven;
// });
