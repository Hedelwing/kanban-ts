import React, { FC, useEffect, useRef } from 'react'
import { ErrorOutline } from '@material-ui/icons'
import { CSSTransition } from 'react-transition-group'
import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: 'border-box',
        paddingTop: 8,
        paddingBottom: 8,
        overflow: 'hidden',
        transition: '.7s cubic-bezier(0, 0.55, 0.45, 1)',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.error.main
    },
    ico: {
        marginRight: 8
    },
    enter: {
        maxHeight: 0,
        opacity: 0
    },
    enterActive: {
        maxHeight: 100,
        opacity: 1
    },
    exit: {
        maxHeight: 100,
    },
    exitActive: {
        maxHeight: 0,
        opacity: 0
    }
}))

type Props = {
    msg?: string
    show: boolean
}

const Message: FC<Props> = ({ msg, show } ) => {
    const { root, ico, ...ani } = useStyles()
    const prevMsg: React.MutableRefObject<string | undefined> = useRef()

    useEffect(() => {
        prevMsg.current = msg
    })

    return <CSSTransition in={show} unmountOnExit timeout={700} classNames={ani}>
        <Box className={root}>
            <ErrorOutline color="inherit" fontSize='small' className={ico} />
            <Typography>{msg || prevMsg.current}</Typography>
        </Box>
    </CSSTransition>
}

export default Message