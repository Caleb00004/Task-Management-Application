const AsyncHandler = require('express-async-handler')
const Task = require("../schemas/taskSchema")

// Create Task
const createTask = AsyncHandler(async (req, res, next) => {
    const {title, completion} = req.body

    if (!title || !completion ) {
        res.status(401).json({
            message: "Please provide all Fields (title and completion)"
        })
    }

    try {
        const newTask = await Task.create({
            title,
            completion
        })

        console.log(newTask)
        const fullTask = await Task.findOne({_id: newTask._id})

        res.status(201).json(fullTask)
    } catch (error) {
        res.status(401)
        throw new Error(error.message)
    }
})

// To Get All Task
const getTask = AsyncHandler(async (req, res, next) => {
    try {
        const getAllTask = await Task.find()

        res.status(201).json(getAllTask)
    } catch(error) {
        res.status(401)
        throw new Error(error.message)
    }
})

// To update Task Completion
const updateTaskCompletion = AsyncHandler (async (req, res, next) => {
    if(!req.body.taskId) {
        throw new Error ('Please Provide Task Id')
    }

    const {taskId} = req.body;

    try {
        // Fetch the current value of the completion field
        const task = await Task.findById(taskId);

        if (!task) {
            throw new Error('Task not found');
        }

        // Flip the completion field
        const newCompletionValue = !task.completion;

        // Update the task with the new value
        await Task.updateOne({ _id: taskId }, { $set: { completion: newCompletionValue } });

        res.status(201).json({
            message: 'Task completion status successfully updated',
            completion: newCompletionValue
        });
    } catch (err) {
        res.status(401)
        throw new Error(err.message)
    }
})

// DELETE request to delete a Task
const updateTask = AsyncHandler (async (req, res, next) => {
    if(!req.body.taskId) {
        throw new Error ('Please Provide Task ID')
    } 

    if (!req.body.title) {
        throw new Error("Pleasee Provide New Title")
    }

    const {taskId} = req.body

    Task.updateOne({_id: taskId}, {$set: {title: req.body.title}})
        .then((data) => {
            res.status(201).json({
                message: 'Task Updated successfully update'
            })
        })
        .catch((err) => {
            throw new Error (err.message)
        })
})


// DELETE request to delete a Task
const deleteTask = AsyncHandler (async (req, res, next) => {
    if(!req.body.taskId) {
        throw new Error ('Please Provide Task ID')
    }

    const {taskId} = req.body

    try {
        await Task.findOneAndDelete({_id: taskId})

        res.status(201).json({
            message: 'Task successfully deleted'
        })
    } catch (error) {
        console.log(error)
        throw new Error (error.message)
    }

})


module.exports = {createTask, getTask, updateTaskCompletion, deleteTask}