import { Dispatch } from 'redux'
import { INIT, USER_AUTHORIZE, USER_UNAUTHORIZE } from '../actionTypes'
import { AuthorizeAction } from '../types'
import { fetchPrivateData, URL } from './fetch'

type signInBody = {
    identifier: string
    password: string
}

type signUpBody = {
    username: string
    email: string
    password: string
}

export const appInit = () =>
    (dispatch: Dispatch) =>
        fetchPrivateData(`${URL}/users/me`)
            .then(({ username, email }) => dispatch({
                type: INIT,
                payload: { username, email }
            }))
            .catch((e) => dispatch({
                type: INIT,
                payload: null
            }))

function authorize(API: string) {
    return (body: signInBody | signUpBody, onError: Function) =>
        async (dispatch: Dispatch) => {
            try {
                const response = await fetch(API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })

                const data = await response.json()

                if (!response.ok)
                    onError('Проверьте правильность вводимых данных')

                else {
                    const { email, username } = data.user

                    localStorage.setItem('token', data.jwt)

                    dispatch<AuthorizeAction>({
                        type: USER_AUTHORIZE,
                        payload: { email, username }
                    })
                }
            }
            catch (e) {
                onError('Нет соединения с сервером')
            }
        }
}

export const signIn = authorize(`${URL}/auth/local`)
export const signUp = authorize(`${URL}/auth/local/register`)

export const signOut = () =>
    (dispatch: Dispatch) => {
        localStorage.removeItem('token')

        dispatch({
            type: USER_UNAUTHORIZE,
        })
    }
