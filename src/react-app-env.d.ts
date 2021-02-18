/// <reference types="react-scripts" />

type ModalTypes = "NEW_TASK" | "CHANGE_TASK" | null

type User = {
    username: string
    email: string
}

type Task = {
    id: number
    name: string
    description?: string
    board: number
}

type Board = {
    id: number
    name: string
}