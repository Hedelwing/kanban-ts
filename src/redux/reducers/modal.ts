import { CLOSE_MODAL, OPEN_MODAL } from "../actionTypes"
import { ModalActionTypes, ModalState } from "../types"

const initialState: ModalState = {
    isOpen: false,
    type: null,
    props: {}
}

function modalReducer(
    state = initialState,
    action: ModalActionTypes
): ModalState {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                isOpen: true,
                ...action.payload
            }
        case CLOSE_MODAL: {
            return initialState
        }

        default:
            return state
    }
}

export default modalReducer