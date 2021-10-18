require('dotenv').config();
const express = require('express');

const cors = require('cors');

const router = require('./src/routes');


const http = require('http');
const { Server } = require('socket.io');

const app = express();

const port = 5000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

require('./src/socket')(io);

app.use(express.json());
app.use(cors());

app.use('/api/v1/', router);
app.use('/uploads', express.static('uploads'));

server.listen(port, () => console.log(`Listening on port ${port}!`))
