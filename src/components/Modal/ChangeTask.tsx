import { Box, Button, CircularProgress, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { useFormik } from 'formik'
import React, { FC, memo } from 'react'
import { changeTask } from '../../redux/actions/tasks'
import { bindActionCreators, Dispatch } from 'redux'

type OwnProps = {
    id: number
    name: string
    description: string
}

const mapDispatchToProps = (dispatch: Dispatch, { id }: OwnProps) =>
    ({ changeTask: bindActionCreators(changeTask(id), dispatch) })

type Props = ReturnType<typeof mapDispatchToProps> & OwnProps

const ChangeTask: FC<Props> = memo(({ name, description, changeTask }) => {
    const { validateForm, handleSubmit, handleChange, values, isSubmitting, isValid } = useFormik({
        initialValues: {
            description,
            name
        },
        onSubmit: async (values, { setSubmitting }) => {
            await changeTask(values)
            setSubmitting(false)
        },
        validate: ({ name }) => {
            return name ? {} : { name: 'Обязательное поле' }
        },
        isInitialValid: false
    })

    return <form onChange={() => validateForm()} onSubmit={handleSubmit}>
        <Box pb={3}>
            <TextField
                onChange={handleChange}
                size='small'
                label="Заголовок"
                autoComplete='off'
                variant="outlined"
                fullWidth
                value={values.name}
                name='name'
                inputProps={{ maxLength: 50 }}
            />
        </Box>
        <Box pb={3}>
            <TextField
                onChange={handleChange}
                size='small'
                label="Описание"
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                value={values.description}
                name='description'
            />
        </Box>
        <Box pb={2}>
            <Button disabled={isSubmitting || !isValid} type='submit' color='primary' variant='contained' fullWidth>
                {isSubmitting ? <CircularProgress size={24} /> : 'Отправить'}
            </Button>
        </Box>
    </form>
})

export default connect(null, mapDispatchToProps)(ChangeTask)