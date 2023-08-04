// app.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const user = require('./Controllers/UserController')
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); 
// db connection
require('./Database/Db')

app.use("/api",user)





// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
