const express = require('express');
const cors = require('cors');
const app=express();
require('./config/mongoose.config'); 
app.use(cors())
app.use(express.json());                           /* This is new */
app.use(express.urlencoded({ extended: true })); 
require('./routes/productmanager.routes')(app);
const port=8000;
app.listen(port,()=>{`Listening in port ${port}` });