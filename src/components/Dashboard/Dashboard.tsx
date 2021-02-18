import { makeStyles } from '@material-ui/core'
import { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { boardInit } from '../../redux/actions/boards'
import { RootState } from '../../redux/reducers'
import Board from './Board'
import NewBoard from './NewBoard'
import Modal from '../Modal/Modal'
import { bindActionCreators, Dispatch } from 'redux'

const styles = makeStyles(theme => ({
    root: {
        display: 'inline-flex',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        paddingLeft: 16,
        paddingRight: 16
    },
    transitionItem: {
        width: 360,
        '&:not(:last-child)': {
            marginRight: theme.spacing(2)
        }
    },
    enter: {
        maxHeight: 0,
        maxWidth: 0,
        opacity: 0,
        overflow: 'hidden',
        transition: 'max-height, max-width .3s ease, opacity .2s ease .3s'
    },
    enterActive: {
        maxHeight: 2000,
        maxWidth: 1000,
        opacity: 1
    },
    exit: {
        maxHeight: 2000,
        maxWidth: 1000,
        opacity: 0,
        overflow: 'hidden',
        transition: 'opacity .3s ease, max-height, max-width .2s ease .3s'
    },
    exitActive: {
        opacity: 0,
        maxHeight: 0,
        maxWidth: 0,
    },
}))

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ boardInit }, dispatch)
const mapStateToProps = ({ boards }: RootState) => ({ boards })

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps> 

const Dashboard: FC<Props> = ({ boardInit, boards }) => {
    useEffect(() => { boardInit() }, [])

    const { root, transitionItem, ...ani } = styles()

    return <>
        <TransitionGroup className={root}>
            {boards.map(board =>
                <CSSTransition
                    key={board.id}
                    timeout={500}
                    classNames={ani}
                >
                    <div className={transitionItem}>
                        <Board {...board} />
                    </div>
                </CSSTransition>
            )}
            <CSSTransition
                key='newBoard'
                timeout={500}
                classNames={ani}
            >
                <div className={transitionItem}>
                    <NewBoard />
                </div>
            </CSSTransition>
        </TransitionGroup>
        <Modal />
    </>
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)