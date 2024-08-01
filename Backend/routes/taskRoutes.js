const express = require('express')
const {createTask, getTask, updateTaskCompletion, deleteTask} = require('../controllers/taskController')

const router = express.Router()

// To get a Task
router.route('/').get(getTask)

// To Create a Task
router.route('/').post(createTask)

// To Update Task Completion Status
router.route('/complete').patch(updateTaskCompletion)

// To delete a Task
router.route('/delete').delete(deleteTask)


module.exports = router