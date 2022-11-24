import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

/* 
    State is the previous state before making the change which is the workouts
    under the state hook.

    This keeps the state in sync with the database
 */
export const workoutsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_WORKOUTS':
        return { 
          workouts: action.payload 
        }
      case 'CREATE_WORKOUT':
        return { 
          workouts: [action.payload, ...state.workouts] 
        }
      case 'DELETE_WORKOUT':
        return { 
          workouts: state.workouts.filter(w => w._id !== action.payload._id) 
        }
      default:
        return state
    }
  }
  
export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, { 
      workouts: null
    })
    
    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}