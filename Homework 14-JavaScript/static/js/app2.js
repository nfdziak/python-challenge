// from data.js
var tableData = data;
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
// console.log(tableData);

// tableData.forEach(function(ufoData) {
//     console.log(ufoData);
// });

// tableData.forEach(function(ufoData) {
//     console.log(ufoData);
//     var row = tbody.append("tr")
// &
//     Object.entries(ufoData).forEach(function([key, value]) {
//         console.log(key, value);
//         var cell = tbody.append("td");
//     });
// }); 
tableData.forEach(function(ufoData) {
    // console.log(ufoData);
    var row = tbody.append("tr")
    Object.entries(ufoData).forEach(function([key, value]) {
        // console.log(key, value);
        var cell = row.append("td");
        cell.text(value);
    });
});

var filter = d3.select("#filter-btn");
filter.on("click", function() {
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    console.log("Test1");
    console.log(inputValue);
    var filteredData = tableData.filter(row => row.datetime === inputValue);
    console.log(filteredData);
    buildTable(filteredData);

    
});

//  if (inputValue) {
//     // Apply `filter` to the table data to only keep the
//     // rows where the `datetime` value matches the filter value
//     filteredData = filteredData.filter(row => row.datetime === inputValue);
//   }
 
  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will


 
  // Build the table when the page loads
 buildTable(tableData);
};