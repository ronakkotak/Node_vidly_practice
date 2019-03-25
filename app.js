const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet);

//enable morgan
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled ... ');
}

//api for genres 
app.use('/api/genres', require('./routes/api/genres'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server started on Port ${PORT}`));

