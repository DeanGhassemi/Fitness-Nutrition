import { createContext, useReducer } from "react";

export const WorkoutContext = CreateContext()

export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutsReducer, {workouts:null})

    return (
        <WorkoutContext.Provider value={p}>
            {children}
        </WorkoutContext.Provider>
    )
}