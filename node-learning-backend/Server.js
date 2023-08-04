// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Router/Router')
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); 
// db connection
require('./Database/Db')

app.use('/api',router)



// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
