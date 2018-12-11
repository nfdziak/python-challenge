// from data.js
var tableData = data;

var tbody = document.querySelector("tbody");
// var dateInput = document.querySelector("#datetime");
var stateInput = document.querySelector("#state");
var searchBtn = document.querySelector("#filter-btn");
var cityInput= document.querySelector("#city");
// var countryInput = document.querySelector("#country");
// var shapeInput = document.querySelector("#shape");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
searchBtn.addEventListener("click", function (event) {
  handleSearchButtonClick(event)
});

//Assign the data from `data.js` to a descriptive variable
var filteredData = data;

// renderTable renders the filteredUFO to the tbody
function renderTable() {
  tbody.innerHTML = "";
  console.log("rendering");
var tableData = data;
var tbody = d3.select("tbody");


function buildTable(tableData) {
    // First, clear out any existing data
    tbody.html("");

    data.forEach(function(tableData) {
        console.log(tableData);
        var row = tbody.append("tr")
        Object.entries(tableData).forEach(function([key, value]) {
            console.log(key, value);
            var cell = row.append("td");
            cell.text(value);
        });        
    });
 } 
 function filterClick() {
    d3.event.preventDefault();
    function handleSearchButtonClick(event) {

    var inputValue = d3.select("#city").property("value");
    var inputValue = d3.select("#state").property("value");
//     // let filteredData = tableData;
    console.log(inputValue);

    var filteredData = tableData.filter(row => row.city=== inputValue); 
    var filteredData = tableData.filter(row => row.state=== inputValue); 
    console.log(filteredData);

   rendeTable(filteredData); 
// }

d3.selectAll("#filter-btn").on("click", filterClick);
renderTable(tableData);  
// Build the table when the page loads
