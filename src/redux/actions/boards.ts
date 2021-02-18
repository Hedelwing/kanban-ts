import { Dispatch } from 'redux'
import { BOARD_INIT, ADD_BOARD, DELETE_BOARD, RENAME_BOARD } from '../actionTypes'
import { fetchPrivateData, URL } from './fetch'

export const boardInit = () =>
    (dispatch: Dispatch) => {
        Promise.all([`${URL}/boards`, `${URL}/tasks`]
            .map(url => fetchPrivateData(url)))
            .then(([boards, tasks]) =>
                dispatch({
                    type: BOARD_INIT,
                    payload: {
                        boards: boards.map(({ id, name }: any): Board =>
                            ({ id, name })
                        ),
                        tasks: tasks.map(({ id, name, description, board }: any): Task =>
                            ({ id, name, description, board: board.id })
                        )
                    }
                })
            )
            .catch((e) => console.log(e.message))
    }


export const deleteBoard = (id: number) =>
    (dispatch: Dispatch) => {
        return fetchPrivateData(`${URL}/boards/${id}`, {
            method: 'DELETE'
        })
            .then(({ id }) =>
                dispatch({
                    type: DELETE_BOARD,
                    payload: { id }
                })
            )
            .catch((e) => console.log(e.message))
    }

export const renameBoard = ({ id, name }: Pick<Board, "id" | "name">) =>
    (dispatch: Dispatch) => {
        return fetchPrivateData(`${URL}/boards/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        })
            .then(({ id, name }) =>
                dispatch({
                    type: RENAME_BOARD,
                    payload: { id, name }
                })
            )
            .catch((e) => console.log(e.message))
    }


export const addBoard = (board: Board) =>
    (dispatch: Dispatch) => {
        return fetchPrivateData(`${URL}/boards`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(board)
        })
            .then(({ id, name }) =>
                dispatch({
                    type: ADD_BOARD,
                    payload: { id, name }
                })
            )
            .catch((e) => console.log(e.message))
    }