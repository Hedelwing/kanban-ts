import { Box, Button, CircularProgress, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { useFormik } from 'formik'
import React from 'react'
import { addTask } from '../../redux/actions/tasks'

const AddTask = ({ board, addTask }: any) => {
    const initialValues = {
        description: '',
        name: ''
    }
    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            await addTask({ ...values, board })
            setSubmitting(false)
        },
        validate: ({ name }) => {
            return name ? {} : { name: 'Обязательное поле' }
        },
        isInitialValid: false
    })

    return <form onChange={() => formik.validateForm()} onSubmit={formik.handleSubmit}>
        <Box pb={3}>
            <TextField
                onChange={formik.handleChange}
                size='small'
                label="Заголовок"
                autoComplete='off'
                variant="outlined"
                fullWidth
                value={formik.values.name}
                name='name'
                inputProps={{ maxLength: 50 }}
            />
        </Box>
        <Box pb={3}>
            <TextField
                onChange={formik.handleChange}
                size='small'
                label="Описание"
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                value={formik.values.description}
                name='description'
            />
        </Box>
        <Box pb={2}>
            <Button disabled={formik.isSubmitting || !formik.isValid} type='submit' color='primary' variant='contained' fullWidth>
                {formik.isSubmitting ? <CircularProgress size={24} /> : 'Отправить'}
            </Button>
        </Box>
    </form>
}

export default connect(null, { addTask })(AddTask)