const express = require('express');
const router = express.Router();
const user = require('../Controllers/UserController')
const task =require("../Controllers/TaskController")
const {verifyToken} = require('../JWT/index')


// user 

router.post('/register', user.register);
router.post('/login', user.login);

//  verif token
router.use(verifyToken)
// get users
router.get('/getusers', user.getUser);

// tasks

router.get("/gettasks",task.getTasks);
router.get("/getonetask",task.getOneTask);
router.post("/addtask",task.addTask);
router.put('/edittask',task.editTask);
router.delete('/deletetask',task.deleteTask);


module.exports = router;