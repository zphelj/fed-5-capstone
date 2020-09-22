// Setup object to act as endpoint for all routes
projectData = {
  location: "",
  start_date: "",
  end_date: "",
  pixabay_url: "",
  weather: {}
}

// we have variables coming from the environment
const dotenv = require('dotenv');
const result = dotenv.config()
if (result.error) {
  throw result.error
};

// ENV loaded properly
const serverport = process.env.TRAVEL_APP_SERVER_PORT;

// brings window.fetch to node server side apps
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static('dist'));

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log('Dirname = ', __dirname)

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
});

// Handle /trip route
app.get('/trip', (req, res) => {
  console.log('In-> handle route /trip'); // DEBUG
  console.log('Sending: ', projectData);
  res.send(JSON.stringify(projectData));
});

// for testing server access
app.get('/hello', (req, res) => {
  console.log('In-> handle route /hello'); // DEBUG
  res.send("Hello from server.js ...");
});

function addPostData(req,res) {
  console.log('In-> addPostData()'); // DEBUG
  //console.log('Adding: ', req,body);
  projectData.location = req.body.location;
  projectData.start_date = req.body.start_date;
  projectData.end_date = req.body.end_date;
  projectData.pixabay_url = req.body.pixabay_url;
  projectData.weather = req.body.weather;
  res.send(projectData);
}

// Handle POST '/add'
app.post('/add', addPostData);

// Startup the server instance
app.listen(serverport,  () => {
  console.log(`Travel App Server listening on port ${serverport}!`);
});

module.exports = {
  // ES5 export is best for now with server.js and NODE JEST testing
}