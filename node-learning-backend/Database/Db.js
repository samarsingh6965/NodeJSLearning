const dbURI = 'mongodb+srv://samarsuvaidyam:root@hrms.tu4l5xo.mongodb.net';
const mongoose = require('mongoose');

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});