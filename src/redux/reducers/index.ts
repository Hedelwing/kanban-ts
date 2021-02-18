import { combineReducers } from "redux"
import system from "./system"
import tasks from "./tasks"
import modal from "./modal"
import boards from "./boards"

const rootReducer = combineReducers({
    system,
    tasks,
    modal,
    boards
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer