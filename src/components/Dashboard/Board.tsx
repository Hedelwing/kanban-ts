import { Box, Card, CircularProgress, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import React, { ChangeEvent, FormEvent, memo, FC } from 'react'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { bindActionCreators, Dispatch } from 'redux'
import { deleteBoard, renameBoard, openModal, moveTask } from '../../redux/actions'
import { RootState } from '../../redux/reducers'
import Task from './Task'

const styles = makeStyles(theme => ({
    card: ({ isOver }: { isOver: boolean }) => ({
        backgroundColor: isOver ? "#F0FAFA" : theme.palette.secondary.light,
        padding: 8,
        transform: isOver ? 'translate3d(0,0,0) scale(1.025)' : 'translate3d(0,0,0) scale(1)',
        transition: '.3s ease',
        width: 360,
        marginRight: 16,
        boxShadow: isOver ? theme.shadows[6] : theme.shadows[3]
    }),
    enter: {
        maxHeight: 0,
        opacity: 0,
        overflow: 'hidden',
        transition: 'max-height .3s ease, opacity .2s ease .3s'
    },
    enterActive: {
        maxHeight: 2000,
        opacity: 1
    },
    exit: {
        maxHeight: 2000,
        opacity: 0,
        overflow: 'hidden',
        transition: 'opacity .3s ease, max-height .2s ease .3s'
    },
    exitActive: {
        opacity: 0,
        maxHeight: 0
    },
}))

const mapStateToProps = ({ tasks }: RootState, props: Board) => ({
    tasks: tasks
        .filter((task: Task) => task.board === props.id)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteBoard: bindActionCreators(deleteBoard, dispatch),
    renameBoard: bindActionCreators(renameBoard, dispatch),
    moveTask: bindActionCreators(moveTask, dispatch),
    openModal: bindActionCreators(openModal, dispatch),
})

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & Board

const Board: FC<Props> = memo(({ id, name, tasks, openModal, deleteBoard, renameBoard, moveTask }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "TASK",
        drop: (item: any) => {
            if (item.board !== id) {
                moveTask(item.id, id)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver() && monitor.canDrop()
        }),
        canDrop: (item) => item.board !== id
    })

    const { card, ...classes } = styles({ isOver })

    const [editable, setEditable] = React.useState(false)
    const [value, setValue] = React.useState(name)
    const [pending, setPending] = React.useState(false)

    const onChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setValue(value)

    return <Card ref={drop} className={card}>
        <Box px={1} height={64} display='flex' alignItems='center' borderBottom='1px solid #4C385644'>
            {editable ?
                <form style={{ flex: 1 }} onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault()

                    if (value && value !== name) {
                        setPending(true)

                        await renameBoard({ id, name: value })

                        setPending(false)
                    } else setValue(name)

                    setEditable(false)
                }}>
                    <Box flex={1}>
                        <TextField
                            name='name'
                            size='small'
                            fullWidth
                            value={value}
                            label='Редактирование'
                            autoFocus
                            autoComplete='off'
                            onChange={onChange}
                            InputProps={{
                                endAdornment: pending && <InputAdornment position="end">
                                    <CircularProgress size={20} />
                                </InputAdornment>,
                            }}
                            onBlur={() => setEditable(false)}
                        />
                    </Box>
                </form>
                : <Box display='flex' flex={1} justifyContent='space-between' alignItems='center'>
                    <Box py={1.5} minHeight={40} onClick={() => setEditable(true)}>
                        <Typography variant='h6' align='center'>{name}</Typography>
                    </Box>
                    <Box>
                        <Box display='inline' mr={1}>
                            <IconButton
                                size='small'
                                color='primary'
                                onClick={() => openModal("NEW_TASK", { board: id })}
                            >
                                <Add />
                            </IconButton>
                        </Box>
                        <IconButton
                            size='small'
                            color='primary'
                            onClick={() => deleteBoard(id)}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                </Box>
            }
        </Box>
        <Box py={2}>
            <TransitionGroup className="todo-list">
                {tasks.map((task: Task) => <CSSTransition
                    key={task.id}
                    timeout={500}
                    classNames={{ ...classes }}
                >
                    <Box>
                        <Task {...task} />
                    </Box>
                </CSSTransition>)}
            </TransitionGroup>
        </Box>
    </Card >
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)