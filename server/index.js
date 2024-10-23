const cors=require('cors');
const express =require('express');
const {errorHandle}=require('./vaildators/error-handle');
const bodyParser=require('body-parser');
const app=express();
const connection=require('./db-connection/connection');
const router=require('./routes/router');
const taskRoute=require('./routes/create-task-route');
const fetchRoute=require('./routes/fetch-task-route');
const deleteRoute = require('./routes/delete-task-route');
const updateRoute = require('./routes/update-task-route');
const http = require('http');
const socketIo = require('socket.io');
const fetchUserRoute = require('./routes/userRoute');
const teamRouter = require('./routes/team-route');


const server = http.createServer(app);
const io = socketIo(server);
const corsOptions = {
    origin: 'http://localhost:3000',
    methods:'POST,GET,PUT,DELETE,PATCH,HEAD',
    credentials:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  app.use(cors(corsOptions))


  app.use(express.json());
//   app.use(bodyParser.json());
  app.use('/',router);
  app.use('/', fetchUserRoute);
  app.use('/',taskRoute);
  app.use('/',fetchRoute);
  app.use('/', deleteRoute);
  app.use('/', updateRoute);
  app.use('/',teamRouter);


app.use(errorHandle);
connection().then(()=>{
    console.log("Your database connected");
}).catch((err)=>{
    console.log(err);
});

app.listen(5008,()=>{
    console.log("You have created server successfully");
});