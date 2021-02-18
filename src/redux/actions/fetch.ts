import { USER_UNAUTHORIZE } from '../actionTypes'
import store from '../store'

export const URL = 'https://hedelwing-kanban.herokuapp.com' || process.env.API

export const fetchPrivateData = async (url: string, config?: RequestInit) => {
    const token = localStorage.getItem('token')

    if (!token) {
        store.dispatch({
            type: USER_UNAUTHORIZE
        })

        throw new Error('Что-то пошло не так')
    }

    const response = await fetch(url, { ...config, headers: { ...config?.headers, "Authorization": `Bearer ${token}` } })

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token')

            store.dispatch({
                type: USER_UNAUTHORIZE
            })
        }

        throw new Error('Что-то пошло не так')
    }

    return await response.json()
}