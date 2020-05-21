const express = require('express');
const app = express();
const server = require('http').Server(app);
const PORT = process.env.PORT || 2020;
 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

server.listen(PORT);
console.log(`START Server at ${PORT} ✔`)