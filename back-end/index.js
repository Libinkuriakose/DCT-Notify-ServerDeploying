const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./config/db');
var socket = require('socket.io');
const path = require('path');


const PORT = process.env.PORT || 5000;

const { routes } = require('./config/routes');


app.use(express.json());
app.use(cors());

app.use('/', routes);


app.use(express.static(path.join(__dirname, './app/front-end/demo-app/build')));

app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname,'./app/front-end/demo-app/build/index.html'));
});




app.listen(PORT, () => {
    console.log('listening on port', PORT);
});

server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});