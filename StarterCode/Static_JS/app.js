//Jsonify the URL to read the "sample.json" file as a variable.
var data;
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (bbData){

    //Log the data into your html console
    console.log(bbData);
    data = bbData

    //create a variable for the dropdown with the select function 
    var dropdown = d3.select("#selDataset");

    //create a variable to pull the ID numbers
    var allIDs = bbData["names"];

    //create a forloop to run through all the Id Numbers 
    for (var id of allIDs){
        //attach each text format of the id to the dropdown with the "option" tag.  
        dropdown.append("option").text(id);
    };

    //create a loop varible to access the samples.json
    chartLoop(allIDs[0])
})
//Create a looping filter function 
function chartLoop(ID){
    var sample = data[`samples`].filter(function (dict){
                                                        return dict .id==ID})[0]
        console.log(sample)
      
    //create a horizontal bar graph
    let trace1 = {
    type: "bar",
    x: sample.sample_values.slice(0, 10).reverse(),   
    y: sample.otu_ids.slice(0,10).map(function (addition){
        return "OTU " + addition}).reverse(),
    orientation: 'h',
    text: sample.otu_labels.slice(0, 10).reverse(),
    marker:{
        color: sample.sample_values.slice(0, 10).reverse(),
        colorscale: 'Jet'}
  };

  // Create a layout parameter 
  var layout = {
    title: 'Top 10 OTUs In Each Individuals'
  };

  // Create the plot function to show the graph
  Plotly.newPlot('bar',[trace1],layout)

  // Create a bubble garph 
  let trace2 = {
    mode: "markers",
    x: sample.otu_ids,
    y: sample.sample_values,   
    text: sample.otu_labels,
    marker: {
        color: sample.otu_ids,
        colorscale: 'YlGnBu',
        size: sample.sample_values
    } 
  };

  // Create a layout parameter 
  var layout2 = {
    title: 'Bubble Chart'
  };

  // Create the plot function to show the graph
  Plotly.newPlot('bubble',[trace2],layout2)

  // Create a filter function
  var metaData = data[`metadata`].filter(function (dict){
    return dict .id==ID})[0]

    console.log(metaData)
    
    //Create a select statement for sample metadata
    var metaDiv = d3.select(`#sample-metadata`)
    metaDiv.html("")
    //Create a for loop to process both variables and append to the html page
    for (var [k, v] of Object.entries(metaData)){
                                                metaDiv.append('div').html(`<b>${k}</b>: ${v}`)}
} 
// Run the loop function 
function optionChanged(ID){
    chartLoop(ID)
}
