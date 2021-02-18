import { ADD_BOARD, ADD_TASK, BOARD_INIT, CHANGE_TASK, CLOSE_MODAL, DELETE_BOARD, DELETE_TASK, INIT, MOVE_TASK, OPEN_MODAL, RENAME_BOARD, USER_AUTHORIZE, USER_UNAUTHORIZE } from "./actionTypes"

export interface SystemState {
    isInit: boolean
    user: User | null
}

export interface AuthorizeAction {
    type: typeof USER_AUTHORIZE
    payload: User
}

export interface InitAction {
    type: typeof INIT
    payload: User
}

export interface UnAuthorizeAction {
    type: typeof USER_UNAUTHORIZE
}

export type SystemActionTypes = AuthorizeAction | UnAuthorizeAction | InitAction

export interface ModalState {
    isOpen: boolean,
    type: ModalTypes,
    props: any
}

export interface OpenModalAction {
    type: typeof OPEN_MODAL
    payload: {
        type: ModalTypes,
        props: any
    }
}

export interface CloseModalAction {
    type: typeof CLOSE_MODAL
}

export type ModalActionTypes = OpenModalAction | CloseModalAction

export interface AddTaskAction {
    type: typeof ADD_TASK
    payload: Task
}

export interface DeleteTaskAction {
    type: typeof DELETE_TASK
    payload: Pick<Task, "id">
}

export interface ChangeTaskAction {
    type: typeof CHANGE_TASK
    payload: Pick<Task, "id" | "name" | "description">
}

export interface MoveTaskAction {
    type: typeof MOVE_TASK
    payload: Pick<Task, "id" | "board">
}

export interface BoardInitAction {
    type: typeof BOARD_INIT
    payload: {
        tasks: Task[]
        boards: Board[]
    }
}

export type TaskActionTypes = BoardInitAction | AddTaskAction | DeleteTaskAction | ChangeTaskAction | MoveTaskAction

export interface AddBoardAction {
    type: typeof ADD_BOARD
    payload: Board
}

export interface DeleteBoardAction {
    type: typeof DELETE_BOARD
    payload: Pick<Board, "id">
}

export interface RenameBoardAction {
    type: typeof RENAME_BOARD
    payload: Pick<Board, "id" | "name">
}

export type BoardActionTypes = BoardInitAction | AddBoardAction | DeleteBoardAction | RenameBoardAction