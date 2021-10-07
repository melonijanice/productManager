const express = require('express');
const cors = require('cors');
const app=express();
require('./config/mongoose.config'); 

const socket = require('socket.io');
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(express.json());                           /* This is new */
app.use(express.urlencoded({ extended: true })); 
require('./routes/productmanager.routes')(app);
const port=8000;
const server=app.listen(port,()=>{`Listening in port ${port}` });
// We must also include a configuration settings object to prevent CORS errors
const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    // NOTE: Each client that connects get their own socket id!
    // if this is logged in our node terminal, that means we a new client
    //     has successfully completed the handshake!
    console.log('socket id: ' + socket.id);
    // We add our additional event listeners right inside this function
    // NOTE: "connection" is a BUILT IN events listener
    socket.on('added_product',(data)=>{console.log("added new product",data);
    console.log('socket id_new: ' + socket.id);
    socket.broadcast.emit('product_added',data);});
});


