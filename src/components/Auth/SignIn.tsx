import { Box, Button, Card, CircularProgress, TextField, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import ErrorMessage from '../ErrorMessage'
import *  as yup from 'yup'
import { connect } from "react-redux"
import { signIn } from "../../redux/actions/system"
import { Link } from "react-router-dom"
import PasswordField from "../PasswordInput"
import { bindActionCreators, Dispatch } from "redux"
import { FC } from "react"

const schema = yup.object({
    identifier: yup
        .string()
        .required('заполните поле')
        .email('некорректный email'),
    password: yup
        .string()
        .required('заполните поле')
        .matches(/[A-ZА-ЯЁ]/, 'должен содержать заглавные символы')
        .matches(/[a-zа-яё]/, 'должен содержать cтрочные символы')
        .matches(/\d/, 'должен содержать цифры')
        .min(8, 'минимум 8 символов')
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ signIn }, dispatch)

type Props = ReturnType<typeof mapDispatchToProps>

const SignIn: FC<Props> = ({ signIn }) => {
    const { handleSubmit, values, errors, touched, handleChange, handleBlur, status, isSubmitting } = useFormik({
        initialValues: { identifier: '', password: '' },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            await signIn(values, setStatus)

            setSubmitting(false)
        }
    })

    return <Box maxWidth={360} mx='auto'>
        <Card elevation={3}>
            <Box p={2}>
                <Typography align='center' variant='h6' gutterBottom>
                    Вход
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <ErrorMessage
                        msg={status}
                        show={!!status}
                    />
                    <Box py={1}>
                        <TextField
                            name='identifier'
                            label='Email'
                            size='small'
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.identifier}
                            fullWidth
                        />
                        <ErrorMessage
                            show={!!(touched.identifier && errors.identifier)}
                            msg={errors.identifier?.toString()}
                        />
                    </Box>
                    <Box py={1}>
                        <PasswordField
                            name='password'
                            label='Пароль'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <ErrorMessage
                            show={!!(touched.password && errors.password)}
                            msg={errors.password?.toString()}
                        />
                    </Box>
                    <Box py={1}>
                        <Typography align='center'>
                            Нет аккаунта?{' '}<Link to='/signup'>Зарегистрироваться</Link>
                        </Typography>
                    </Box>
                    <Box py={1}>
                        <Button disabled={isSubmitting} type='submit' color='primary' variant='contained' fullWidth>
                            {isSubmitting ? <CircularProgress size={24} /> : 'Отправить'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Card>
    </Box>
}

export default connect(null, mapDispatchToProps)(SignIn)