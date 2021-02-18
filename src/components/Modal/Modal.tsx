import { Box, Dialog, DialogContent, IconButton, Slide, SlideProps, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { connect } from 'react-redux'
import React from 'react'
import { RootState } from '../../redux/reducers'
import AddTask from './AddTask'
import ChangeTask from './ChangeTask'
import { closeModal } from '../../redux/actions'
import { bindActionCreators, Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ closeModal }, dispatch)
const mapStateToProps = ({ modal }: RootState) => ({ modal })

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide
    direction="up"
    ref={ref}
    {...props}
/>)

const getBody = (type: ModalTypes, props: any) => {
    switch (type) {
        case "NEW_TASK":
            return {
                title: "Новая задача",
                body: <AddTask {...props} />
            }

        case "CHANGE_TASK":
            return {
                title: "Редактирование",
                body: <ChangeTask {...props} />
            }

        default:
            return {
                title: "Ошибка",
                body: null
            }
    }
}

const Modal = ({ modal: { isOpen, type, props }, closeModal }: Props) => {
    const { title, body } = getBody(type, props)

    return <Dialog
        TransitionComponent={Transition}
        keepMounted
        maxWidth='xs'
        fullWidth
        open={isOpen}
        onClose={closeModal}
    >
        <DialogContent>
            <Box display='flex' alignItems='center' justifyContent='space-between' pb={2}>
                <Typography variant='h5'>{title}</Typography>
                <IconButton onClick={closeModal}>
                    <Close />
                </IconButton>
            </Box>
            {body}
        </DialogContent>
    </Dialog>
}

export default connect(mapStateToProps, { closeModal })(Modal)