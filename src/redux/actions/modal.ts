import { CLOSE_MODAL, OPEN_MODAL } from "../actionTypes";

export const closeModal = () => ({
    type: CLOSE_MODAL
})

export const openModal = (type: ModalTypes, props: any) => ({
    type: OPEN_MODAL,
    payload: {
        type,
        props
    }
})