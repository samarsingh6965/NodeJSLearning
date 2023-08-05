const Task = require('../Model/TaskModel'); // Import the User model
const ServerResponseHandler = require('../ServerResponse/ServerResponse');
const response = new ServerResponseHandler();
const verifyToken = require('../JWT/index')



module.exports = {

    getTasks: async (req, res) => {
        try {
            const tasks = await Task.find({});
            return response.handleSuccess(res, 'Tasks fetched Successfully', tasks);
        } catch (error) {
            return response.somethingWentWrong(res)
        }
    },

    addTask: async (req, res) => {
        try {
            const { title, description } = req.body;
            const newTask = new Task({
                title,
                description
            });
            const savedTask = await newTask.save();
            response.handleSuccess(res, 'Task Added Successfully', savedTask)
        } catch (error) {
            response.somethingWentWrong(res);
        }
    },
    getOneTask: async (req, res) => {
        try {
            const taskId = req.query.id; // Assuming you're passing the task _id as a URL parameter
            const task = await Task.findById(taskId); // Query the database using the _id
            if (!task) {
                return response.notFound(res, 'Task not found');
            }
            response.handleSuccess(res, 'Task Fetched Successfully', task);
        } catch (error) {
            response.somethingWentWrong(res);
        }
    },

    // Update by taskId
    editTask: async (req, res) => {
        try {
            const { title, description } = req.body;
            const task = await Task.findByIdAndUpdate(req.body.id, { title, description }, { new: true });
            if (!task) {
                response.handleNotFound(res, 'Task Not Found')
            }
            response.handleSuccess(res, 'Task Updated', task)
        } catch (error) {
            response.somethingWentWrong(res)
        }
    },
    // Delete by taskId
    deleteTask: async (req, res) => {
        try {
            const taskId = req.body.id;
            const deletedTask = await Task.findByIdAndRemove(taskId);
            if (!deletedTask) {
                response.handleNotFound(res, 'Task Not Found');
            } else {
                response.handleSuccess(res, 'Task Deleted', deletedTask);
            }
        } catch (error) {
            console.error(error); // Debugging
            response.somethingWentWrong(res);
        }
    }

}



// 

