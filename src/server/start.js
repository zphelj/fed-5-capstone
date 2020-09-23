// start.js - starts the server

const serverport = 5010;
const app = require('../server/server');
app.listen(serverport);
console.log(`Travel App Server serving ${__dirname} and listening on port ${serverport} ...`);