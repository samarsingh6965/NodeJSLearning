const Task = require('../Model/TaskModel'); // Import the User model
const ServerResponseHandler = require('../ServerResponse/ServerResponse');
const response = new ServerResponseHandler();
const verifyToken = require('../JWT/index')



module.exports={

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
    }


}



// Update user by taskId
// router.put('/tasks/:taskId', async (req, res, next) => {
//     try {
//         const taskId = req.params.taskId;
//         const { username, email, password } = req.body;
//         const user = await User.findByIdAndUpdate(taskId, { username, email, password }, { new: true });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json({ message: 'User updated', user });
//     } catch (error) {
//         next(error);
//     }
// });

// // Delete user by taskId
// router.delete('/tasks/:taskId', async (req, res, next) => {
//     try {
//         const taskId = req.params.taskId;
//         const deletedUser = await User.findByIdAndRemove(taskId);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ message: 'User deleted', deletedUser });
//     } catch (error) {
//         next(error); // Pass the error to the default error handler
//     }
// });