// Back end express server for the FED-5 Capstone application

// Setup object to act as endpoint for all routes
let projectData = {
  location: "",
  start_date: "",
  end_date: "",
  pixabay_url: "",
  weather: {}
};

// Setup, globals
const serverport = 5010;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(express.static('dist'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Basic / route handler
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
});

// Handle /trip route
// Returns the data stored on the server for the current trip
app.get('/trip', (req, res) => {
  console.log('In-> handle route /trip'); // DEBUG
  res.send(JSON.stringify(projectData));
});

// for testing server access
app.get('/hello', (req, res) => {
  console.log('In-> handle route /hello'); // DEBUG
  res.send("Hello from server.js ...");
});

// Function to handle a post of data from the client and store locally
function addPostData(req,res) {
  console.log('In-> addPostData()'); // DEBUG
  //console.log('Adding: ', req,body);
  projectData.location = req.body.location;
  projectData.start_date = req.body.start_date;
  projectData.end_date = req.body.end_date;
  projectData.pixabay_url = req.body.pixabay_url;
  projectData.weather = req.body.weather;
  res.send(projectData);
};

// Handle POST '/add'
app.post('/add', addPostData);

// Must export app for Supertest
module.exports = app;