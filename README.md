# Gut Microbiome Exploration Dashboard

## Overview of the Project

The Gut Microbiome Exploration Dashboard is a web-based platform designed during the Data Analytics Bootcamp to offer users an engaging way to interact with data related to human gut microbiota. The dashboard visualizes the diversity of microbial species in the human gut, emphasizing the prevalence of certain species among a study population. The data visualized highlights that a select few microbial species, known as operational taxonomic units (OTUs), are common across a significant portion of the population, whereas others are less common.

## Dashboard Features

The interactive dashboard is built using JavaScript and allows users to delve into the world of gut microbiome diversity through three primary visual components:

1. An operational taxonomic unit (OTU) bar chart that displays prevalent species.
2. A bubble chart that provides a visual comparison of OTUs by quantity and sample values.
3. Individual demographic information displays that offer insights into specific dataset entries.

To enhance user interaction, the dashboard includes features that allow dynamic selection of OTUs, updating visual components in real-time based on user inputs.

You can see the live version of the dashboard hosted on GitHub Pages: [Gut Microbiome Exploration Dashboard](#).

## Guide to the Repository Layout

The repository is organized to support the continuous development and deployment process of the Gut Microbiome Exploration Dashboard. Here's a brief explanation of the repository structure and the files within.

### Directory and File Structure

- **static/js**:
  - `logic.js`: The core JavaScript file powering the dashboard, it fetches data and handles the logic for updating visual components. It leverages D3.js for DOM manipulation and Plotly.js for visualizations.
- **index.html**:
  - The main entry point for the dashboard's interface, containing the HTML structure.
- **static/data**:
  - `samples.json`: Before deployment, this JSON file is pre-processed to structure the data for the dashboard. It serves as the foundation for the dashboard's data-driven visualizations.

## How to Navigate the Dashboard

Upon loading the dashboard, users will be greeted with default visualizations representing the most common OTUs. The interactive
