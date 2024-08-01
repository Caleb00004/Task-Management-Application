const AsyncHandler = require('express-async-handler')
const Task = require("../schemas/taskSchema")

// Create Task
const createTask = AsyncHandler(async (req, res, next) => {
    const {title, completed} = req.body

    if (!title || completed === undefined ) {
        res.status(401).json({
            message: "Please provide all Fields (title and completed)"
        })
    }

    try {
        const newTask = await Task.create({
            title,
            completed
        })

        res.status(201).json(newTask)
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

// To get filtered Tasks
const getFilteredTasks = AsyncHandler(async (req, res, next) => {
    const { status } = req.params;

    // Convert the completion query parameter to a boolean
    const completionStatus = status === "completed" ? true : false;

    try {
        // Fetch tasks based on the completion status
        const tasks = await Task.find({ completed: completionStatus });
        res.status(200).json(tasks);
    } catch (err) {
        throw new Error(err.message)
    }
});

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


module.exports = {createTask, getTask, updateTaskCompletion, deleteTask, getFilteredTasks}