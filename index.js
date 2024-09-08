require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
const router = require('./routes');
const socketController = require('./socket');

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// use socket controller
socketController(io);

// routers
app.use('/api/v1', router);

app.get('/', (req, res) => {
    const ip_addr = req.headers['x-forwarded-for']  || req.socket.remoteAddress;
    res.send(`Welcome to Realtime Chat API. Your IP address is ${ip_addr}`);
});

app.use((req, res, next) => {
    return res.status(404).json({
        status: 'NOT FOUND',
        message: 'Resource not found!',
        data: null
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: 'INTERNAL SERVER ERROR',
        message: err.message,
        data: null
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});