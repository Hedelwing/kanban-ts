import { ADD_BOARD, BOARD_INIT, DELETE_BOARD, RENAME_BOARD } from "../actionTypes"
import { BoardActionTypes } from "../types"

const initialState: Board[] = []

export default function boardsReducer(
    state = initialState,
    action: BoardActionTypes
): Board[] {
    switch (action.type) {
        case BOARD_INIT:
            return action.payload.boards

        case RENAME_BOARD:
            return state.map(board =>
                board.id === action.payload.id
                    ? { ...board, name: action.payload.name }
                    : board
            )

        case ADD_BOARD:
            return [...state, action.payload]

        case DELETE_BOARD:
            return state.filter(board => board.id !== action.payload.id)

        default:
            return state
    }
}
