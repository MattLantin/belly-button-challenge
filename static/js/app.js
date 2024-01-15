// URL of the data source for visualization
const dataApiUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


/**************************************
 * SECTION: Helper Functions
 **************************************/

// Checks if a Plotly plot exists at a given HTML ID
function isPlotPresent(plotHtmlId) {
    let selectedPlotElement = d3.select('#' + plotHtmlId);
    return !selectedPlotElement.empty() && selectedPlotElement.select('svg').empty() === false;
};

function plotExists(plotId) {
    let plotElement = d3.select('#' + plotId);
    return !plotElement.empty() && plotElement.select('svg').empty() === false;
};

/**************************************
 * SECTION: Initialize
 **************************************/

// Initializes the dashboard
function initializeDashboard() {
    populateDropdownOptions().then(() => {
        let initialSelection = d3.select("#selDataset").property("value");
        generateBarGraph(initialSelection);
        displayMetadata(initialSelection);
        generateBubbleChart(initialSelection);
    });
}

/**************************************
 * SECTION: Set Dropdown Options
 **************************************/

// Fetch and set options for the dropdown menu
function populateDropdownOptions(){
    return d3.json(dataApiUrl).then(function(data) {
        let dropdownMenu = d3.select("#selDataset")
        
        data.names.forEach(function(nameOption) {
            dropdownMenu.append("option")
                .text(nameOption)
                .attr("value", nameOption);
        });
    });
};

/**************************************
 * SECTION: Change Data per Dropdown Value
 **************************************/

// Handles changes in dropdown selection
function handleDropdownChange(selectedItem){
    generateBarGraph(selectedItem);
    displayMetadata(selectedItem);
    generateBubbleChart(selectedItem);
}

/**************************************
 * SECTION: Create Bar Graph
 **************************************/

// Generates a bar graph for a given ID
function generateBarGraph(sampleId){
    d3.json(dataApiUrl).then(function(data) {
        let selectedSample = data.samples.filter(sample => sample.id == sampleId)[0];
        
        let barValues = selectedSample.sample_values.slice(0,10);
        let barLabels = selectedSample.otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let hoverTexts = selectedSample.otu_labels.slice(0,10);
        
        let barGraphData = {
            type: 'bar',
            x: barValues,
            y: barLabels,
            orientation: 'h',
            text: hoverTexts,
            hoverinfo: 'text'
        };
    
        let barGraphLayout = {
            title: 'Top 10 OTUs', 
            margin: { l: 100, r: 100, b: 100, t: 50, pad: 4 },
            yaxis: { autorange: 'reversed' }
        };

        if (!isPlotPresent("bar")) {
            Plotly.newPlot("bar", [barGraphData], barGraphLayout);
        } else {
            let updateData = { x: [barValues], y: [barLabels], text: [hoverTexts] };
            Plotly.restyle("bar", updateData);
        }
    });
};

/**************************************
 * SECTION: Create Bubble Chart
 **************************************/

// Creates a bubble chart for a given ID
function generateBubbleChart(sampleId){
    d3.json(dataApiUrl).then(function(data) {
        let selectedSample = data.samples.filter(sample => sample.id == sampleId)[0];

        let bubbleXValues = selectedSample.otu_ids;
        let bubbleYValues = selectedSample.sample_values;
        let bubbleSizes = selectedSample.sample_values;
        let bubbleColors = selectedSample.otu_ids;
        let bubbleLabels = selectedSample.otu_labels;
        
        let bubbleChartData = {
            x: bubbleXValues,
            y: bubbleYValues,
            mode: 'markers',
            marker: { size: bubbleSizes, color: bubbleColors },
            text: bubbleLabels,
            hoverinfo: 'text'
        };

        let bubbleChartLayout = {
            showlegend: false,
            title: 'OTU Bubble Chart',
            xaxis: { title: 'OTU ID' }
        };

        if (!isPlotPresent("bubble")) {
            Plotly.newPlot("bubble", [bubbleChartData], bubbleChartLayout)
        } else {
            let updateData = {
                x: [bubbleXValues],
                y: [bubbleYValues],
                'marker.size': [bubbleSizes],
                'marker.color': [bubbleColors] 
            };
            Plotly.restyle("bubble", updateData);
        }
    });
}

/**************************************
 * SECTION: Create Metadata
 **************************************/

// Displays metadata for a given ID
function displayMetadata(sampleId){
    d3.json(dataApiUrl).then(function(data) {
        let metadataEntries = Object.entries(data.metadata.filter(sample => sample.id == sampleId)[0]).map(entry => `${entry[0]}: ${entry[1]}`)
        let metadataSection = d3.select("#sample-metadata");
        
        metadataSection.html("");
        metadataSection.selectAll('p')
            .data(metadataEntries)
            .enter().append('p')
            .text(d => d);
    });
}

initializeDashboard();
