import { useWorkoutsContext } from "../hooks/UseWorkoutsContext"
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

/** Add a new workout component
 * 
 * @param {*} workout Workout and the details attached 
 * @return {JSX} adding a new workout        
 */
const WorkoutDetails = ({workout}) => {
    
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Muscle Bias: </strong>{workout.muscle}</p>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Sets: </strong>{workout.sets}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails