/** Add a new workout component
 * 
 * @param {*} workout Workout and the details attached 
 * @return {JSX} adding a new workout        
 */
const WorkoutDetails = ({workout}) => {
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Muscle Bias: </strong>{workout.muscle}</p>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Sets: </strong>{workout.sets}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
        </div>
    )
}

export default WorkoutDetails