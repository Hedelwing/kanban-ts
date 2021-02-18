import { Box, Button, Card, CircularProgress, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { addBoard } from '../../redux/actions/boards'

const NewBoard = ({ addBoard }: { addBoard: Function }) => {
    const { validateForm, handleSubmit, handleChange, values, isSubmitting, isValid } = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            await addBoard(values)

            resetForm()
            setSubmitting(false)
        },
        validate: ({ name }) => {
            return name ? {} : { name: 'Обязательное поле' }
        },
        validateOnMount: true
    })

    return <Card>
        <Box px={1} py={2}>
            <form onChange={() => validateForm()} onSubmit={handleSubmit}>
                <Box pb={2}>
                    <TextField
                        inputProps={{ maxLength: 16 }}
                        autoComplete='off'
                        onChange={handleChange}
                        name='name'
                        value={values.name}
                        label='Новая колонка'
                        fullWidth
                    />
                </Box>
                <Button
                    disabled={isSubmitting || !isValid}
                    type='submit'
                    color='primary'
                    variant='contained'
                    fullWidth
                >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Отправить'}
                </Button>
            </form>
        </Box>
    </Card>
}
export default connect(null, { addBoard })(NewBoard)