import { INIT, USER_AUTHORIZE, USER_UNAUTHORIZE } from "../actionTypes"
import { SystemActionTypes, SystemState } from "../types"

const initialState: SystemState = {
    isInit: false,
    user: null
}

function systemReducer(
    state = initialState,
    action: SystemActionTypes
): SystemState {
    switch (action.type) {
        case INIT:
            console.log(action.type, action)
            return {
                ...state,
                isInit: true,
                user: action!.payload
            }
        case USER_AUTHORIZE: {
            return {
                ...state,
                user: action!.payload
            }
        }

        case USER_UNAUTHORIZE: {
            return {
                ...state,
                user: null
            }
        }

        default:
            return state
    }
}


export default systemReducer