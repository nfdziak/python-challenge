// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
 });
// console.log(queryUrl);

function createFeatures(earthquakeData){
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");

    }
  })
}
 
// function createFeatures(earthquakeData) {
//   var earthquakes = L.geoJSON(earthquakeData, {
//     // console.log("earthquakes");
  
//   // Define a function we want to run once for each feature in the features array
//   // // Give each feature a popup describing the place and time of the earthquake
//   onEachFeature:  function(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + 
//     new Date(feature.properties.time) + "</p>");
//   }
//   })
// };
//   // var radius = (Math.exp(mag/1.01-0.13))*1000; 
  //   L.circle(latling, radius, {
  //   fillOpacity: 0.75,
  //   color: "white",
  //   fillColor: color,
  //   })  
//   // Adjust radius
//   radius: countries[i].points * 1500
// }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
// }

// // }).addTo(map);
  // pointToLayer: function(feature, latlng) {
  //   return new L.circle(latlng, radius) 
  //   var radius = 30000 * magnitude; 
  //     {radius: getRadius(feature.properties.mag),
  //     fillColor:getColor(feature.properties.mag)
  //     fillOpacity:.6, color:"000"
  //    )}
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  // var earthquakes = L.geoJSON(earthquakeData, {
  //   onEachFeature: onEachFeature
  // });
  // Sending our earthquakes layer to the createMap function
 createMap(earthquakes)

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });
  
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}