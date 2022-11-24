import { useState } from "react"
import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";

/** Workout Form for 'Add a New Workout'
 * 
 * @returns Workout form to add a new workout
 */
const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [muscle, setMuscle] = useState('')
    const [load, setLoad] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // e stands for event object
    const handleSubmit = async(e) => {
        e.preventDefault()

        const workout = {title, muscle, load, sets, reps}

        const response = await fetch('/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setMuscle('')
            setLoad('')
            setSets('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log("New Workout Added", json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error': ''}
            />
            <label>Muscle Bias:</label>
            <input 
                type="text"
                onChange={(e) => setMuscle(e.target.value)}
                value={muscle}
                className={emptyFields.includes('muscle') ? 'error': ''}

            />
            <label>Load (lbs):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error': ''}

            />
            <label>Sets:</label>
            <input 
                type="number"
                onChange={(e) => setSets(e.target.value)}
                value={sets}
                className={emptyFields.includes('sets') ? 'error': ''}

            />
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error': ''}

            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}


export default WorkoutForm;