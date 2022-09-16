const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    delWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)


// DELETE a new workout
router.delete('/:id', delWorkout)


// PATCH a workout
router.patch('/:id', updateWorkout)


module.exports = router