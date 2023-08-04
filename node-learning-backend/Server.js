// app.js
const express = require('express');
const app = express();
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
