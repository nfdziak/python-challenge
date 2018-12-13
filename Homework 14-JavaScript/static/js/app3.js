// from data.js
var tableData = data;
var tbody = d3.select("tbody");



function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");

    data.forEach(function(ufoData) {
        // console.log(ufoData);
        var row = tbody.append("tr")
        Object.entries(ufoData).forEach(function([key, value]) {
            // console.log(key, value);
            var cell = row.append("td");
            cell.text(value);
        });        
    });

} 
function filterClick() {
    d3.event.preventDefault();
    var inputValue = d3.select("#datetime").property("value");
    // let filteredData = tableData;
    console.log(inputValue);

    var filteredData = tableData.filter(row => row.datetime === inputValue); 
    console.log(filteredData)

    buildTable(filteredData); 
}

d3.selectAll("#filter-btn").on("click", filterClick);

    
// Build the table when the page loads
buildTable(tableData);


   
  
 
 
  