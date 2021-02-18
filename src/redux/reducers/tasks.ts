import { MOVE_TASK, ADD_TASK, CHANGE_TASK, BOARD_INIT, DELETE_TASK } from "../actionTypes"
import { TaskActionTypes } from "../types"

const initialState: Task[] = []

function cardsReducer(
    state = initialState,
    action: TaskActionTypes
): Task[] {
    switch (action.type) {
        case BOARD_INIT:
            return action.payload.tasks

        case MOVE_TASK:
            return state.map(task =>
                task.id === action.payload.id
                    ? { ...task, board: action.payload.board }
                    : task
            )

        case CHANGE_TASK:
            return state.map(task =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload }
                    : task
            )

        case ADD_TASK:
            return [...state, action.payload]

        case DELETE_TASK:
            return state.filter(task => task.id !== action.payload.id)

        default:
            return state
    }
}

export default cardsReducer