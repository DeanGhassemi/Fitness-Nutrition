import { createContext, useReducer } from "react";

export const WorkoutContext = CreateContext()

/* 
    State is the previous state before making the change which is the workouts
    under the state hook.

    This keeps the state in sync with the database
 */
export const WorkoutReducer = (state, action) => {
    switch (action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.work]
            }
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        default:
            return state
    }
}

export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts:null
    })

    return (
        <WorkoutContext.Provider value={{state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}