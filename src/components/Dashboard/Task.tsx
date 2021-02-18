import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import { Delete, Edit, ExpandMore } from '@material-ui/icons'
import React, { FC, memo } from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { deleteTask, openModal } from '../../redux/actions'

type StylesProps = {
    isDragging: boolean
    expanded: boolean
}

const styles = makeStyles<Theme, StylesProps>({
    accordion: ({ isDragging }) => ({
        opacity: isDragging ? .3 : 1
    }),
    expandMore: ({ expanded }) => ({
        transition: '.3s ease-in',
        transform: expanded ? 'rotate(-180deg)' : 'rotate(0)'
    })
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteTask: bindActionCreators(deleteTask, dispatch),
    openModal: bindActionCreators(openModal, dispatch)
})

type Props = ReturnType<typeof mapDispatchToProps> & Task

const Task: FC<Props> = memo(({ name, id, board, description, deleteTask, openModal }) => {
    const [expanded, setExpanded] = React.useState(false)

    const [{ isDragging }, drag] = useDrag(() => ({
        item: {
            type: "TASK",
            board,
            id,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [])

    const { accordion, expandMore } = styles({ expanded, isDragging })

    return <Box pt={1}>
        <Accordion expanded={expanded} ref={drag} className={accordion}>
            <AccordionSummary onClick={e => e.preventDefault()}>
                <Box flex={1}>
                    <Typography variant='h6'>{name}</Typography>
                </Box>
                <Box mr={.5}>
                    <IconButton
                        size='small'
                        color='primary'
                        onClick={() => openModal("CHANGE_TASK", { name, id, description })}
                    >
                        <Edit />
                    </IconButton>
                </Box>
                <Box mr={.5}>
                    <IconButton
                        size='small'
                        color='primary'
                        onClick={() => { deleteTask(id) }}
                    >
                        <Delete />
                    </IconButton>
                </Box>
                <IconButton
                    size='small'
                    color='primary'
                    disabled={!description} onClick={() => { setExpanded(e => !e) }}
                >
                    <ExpandMore className={expandMore} />
                </IconButton>
            </AccordionSummary>
            <AccordionDetails style={{ wordBreak: 'break-word' }}>
                <Typography>{description}</Typography>
            </AccordionDetails>
        </Accordion>
    </Box>
})


export default connect(null, mapDispatchToProps)(Task)