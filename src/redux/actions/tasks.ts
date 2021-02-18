import { Dispatch } from 'redux'
import { ADD_TASK, MOVE_TASK, CHANGE_TASK, DELETE_TASK } from '../actionTypes'
import { fetchPrivateData, URL } from './fetch'
import { closeModal } from './modal'


export const moveTask = (id: number, board: number) =>
    (dispatch: Dispatch) =>
        fetchPrivateData(`${URL}/tasks/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board })
        })
            .then(({ id, board }) => dispatch({
                type: MOVE_TASK,
                payload: { id, board: board.id }
            })
            )
            .catch((e) => console.log(e.message))

export const changeTask = (id: number) =>
    (data: Pick<Task, "name" | "description">) =>
        (dispatch: Dispatch) =>
            fetchPrivateData(`${URL}/tasks/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(({ id, name, description }) => {
                    dispatch({
                        type: CHANGE_TASK,
                        payload: { id, name, description }
                    })

                    dispatch(closeModal())
                })
                .catch((e) => console.log(e.message))

export const addTask = (data: Pick<Task, "name" | "description" | "board">) =>
    (dispatch: Dispatch) =>
        fetchPrivateData(`${URL}/tasks`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(({ id, name, description, board }) => {
                dispatch({
                    type: ADD_TASK,
                    payload: { id, name, description, board: board.id }
                })

                dispatch(closeModal())
            })
            .catch((e) => console.log(e.message))



export const deleteTask = (id: number) =>
    (dispatch: Dispatch) =>
        fetchPrivateData(`${URL}/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(({ id }) =>
                dispatch({
                    type: DELETE_TASK,
                    payload: { id }
                })
            )
            .catch((e) => console.log(e.message))
