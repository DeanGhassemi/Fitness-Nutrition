const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async(req, res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a workout
const getWorkout = async(req, res) =>{
    const {id} = validateID(req)
    
    if(!id){
        return res.status(404).json({error: 'workout does not exist'})
    }
    

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'workout does not exist'})
    }

    res.status(200).json(workout)
}

// create new workout
const createWorkout = async(req, res) => {
    const {title, muscle, load, sets, reps} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!muscle){
        emptyFields.push('muscle')
    }    
    if(!load){
        emptyFields.push('load')
    }    
    if(!sets){
        emptyFields.push('sets')
    }    
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    // add doc to database
    try{
        const workout = await Workout.create({title, muscle, load, sets, reps})
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const delWorkout = async(req, res) => {
    const {id} = validateID(req)
    
    if(!id){
        return res.status(404).json({error: 'workout does not exist'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error: 'workout does not exist'})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async(req, res) => {
    const {id} = validateID(req)
    
    if(!id){
        return res.status(404).json({error: 'workout does not exist'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error: 'workout does not exist'})
    }

    res.status(200).json(workout)
}


function validateID(req){
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return false;
    }
    return {id}
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    delWorkout,
    updateWorkout
}