const Task = require('../models/task')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/asyncError')

//===================== create tasks=============================
exports.createTask = asyncHandler (async(req, res, next)=>{

    const task = await Task.create(req.body)

    task.save()
    res.status(201).json({
        success: true,
        data: task
    })
})

//===================== get all tasks=============================
exports.getTasks = asyncHandler (async (req, res, next)=>{
    const tasks = await Task.find()

    if(!tasks){
        return next(new ErrorResponse("No tasks found at the moment", 404))
    }

    res.status(200).json({
        success: true,
        count: tasks.length,
        tasks
    })
})

//===================== get single task=============================
exports.getTask = asyncHandler (async (req, res, next)=>{

    const task = await Task.findById(req.params.id)

    if(!task){
        return next(new ErrorResponse("Required tasks not task found at the moment", 404))
    }

    res.status(200).json({
        success: true,
        task
    })
})


//===================== update tasks =============================
exports.updateTask = asyncHandler (async (req, res, next)=>{

    let task = await Task.findById(req.params.id)
    if(!task){
        return next(new ErrorResponse("Required tasks not task found at the moment", 404))
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: task
    })
})

//===================== delete task =============================
exports.deleteTask = asyncHandler (async (req, res, next)=>{

    let task = await Task.findById(req.params.id)

    if(!task){
        return next(new ErrorResponse("Required tasks not found at the moment", 404))
    }

        task = await Task.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    })

    
})