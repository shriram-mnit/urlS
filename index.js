const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors')
var app = express()
 
app.use(cors())

// Connect to database
connectDB();

app.use(express.json());

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));