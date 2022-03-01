const Task = require('../models/task')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/asyncError')
const ApiFilters = require('../utils/filter')

//===================== create tasks=============================
exports.createTask = asyncHandler (async(req, res, next)=>{
    req.body.user = req.user.id
    const task = await Task.create(req.body)
    console.log(req.user.id)
    task.save()
    res.status(201).json({
        success: true,
        data: task
    })
})

//===================== get all tasks=============================
exports.getTasks = asyncHandler (async (req, res, next)=>{
                                        //find tasks only associated with logged in user
    const api = new ApiFilters(Task.find({ user: req.user._id }), req.query)
                 .filter()
                 .sort()
                 .select()
                .paginate()
    
    
    const tasks = await api.query

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
    const _id = req.params.id
                                //get task for logged in user only
    const task = await Task.findById({_id, user: req.user._id})

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

                                    //update task for logged in user only
    let task = await Task.findByOne({_id: req.params.id, user: req.user._id})
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
                                            //delete task for logged in user only
        task = await Task.findByOneAndDelete({_id: req.params.id, user: req.user._id})

    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    })

    
})