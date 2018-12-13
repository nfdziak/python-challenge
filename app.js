function buildMetadata(sample) {
var url = "/samples/<sample>";
var metadata = d3.json(url)
var sample = d3.select("panel-body")
  Panel.innerHTML("")

  Object.entries(sample).forEach(function([key, value]) {
        console.log(key, value);
        d3.append ("p")
        
//         // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.

//     // BONUS: Build the Gauge Chart
//     // buildGauge(data.WFREQ);
// }

function buildCharts(sample) {
  var url = "/samples/<sample>";
  var metadata = d3.json(url)
  var sample = d3.select("panel-body")
    Panel.innerHTML("")
//   // @TODO: Use `d3.json` to fetch the sample data for the plots

var trace1 = {
  labels: ["otu_ids"],
  values: ["sample_values"],
  type: 'pie'
};
var data = [trace1];

var layout = {
  title: "'Pie' Chart",
};

Plotly.newPlot("plot", data, layout);
//     // HINT: You will need to use slice() to grab the top 10 sample_values,
//     // otu_ids, and labels (10 each).
// }

//     // @TODO: Build a Bubble Chart using the sample data
// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("/names").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// }

// // Initialize the dashboard
// init();
