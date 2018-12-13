function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  d3.json("/metadata/" +sample).then((sampleData) => {
    console.log(sampleData);
 
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panel.html("");
    Object.entries(sampleData).forEach(function([key, value]) {
          panel.append("div").text(key+':'+ value);
    });
    // console.log(panel);
       
  });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("/samples/"+sample).then((sampleData) => {
    console.log(sampleData);
    const otu_ids = sampleData.otu_ids;
    const sample_values = sampleData.sample_values;
    const otu_labels = sampleData.otu_labels;
    var data = [
      {
        values: sample_values.slice(0, 10),
        labels: otu_ids.slice(0, 10), 
        hovertext:otu_labels.slice(0, 10),
        hoverinfo:"hovertext",
        type: "pie"
    }];
    
    var layout = {
      margin: { t: 0, l: 0 }
    };
    
    Plotly.plot("pie", data, layout);
// @TODO: Build a Bubble Chart using the sample data
    var bubbleLayout = {
      xaxis: { title: "OTU ID"  },
      hovermode: "closest",
      margin: { t:0}
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids
                }
      }
    ];
    Plotly.plot("bubble", bubbleData, bubbleLayout);
  })  
};  
       // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
