import { Box, Button, Card, CircularProgress, TextField, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import ErrorMessage from '../ErrorMessage'
import { FC } from "react"
import *  as yup from 'yup'
import { connect } from "react-redux"
import { signUp } from "../../redux/actions/system"
import { Link } from "react-router-dom"
import { bindActionCreators, Dispatch } from "redux"
import PasswordField from "../PasswordInput"

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ signUp }, dispatch)

type Props = ReturnType<typeof mapDispatchToProps>

const schema = yup.object({
    username: yup
        .string()
        .required('заполните поле'),
    email: yup
        .string()
        .required('заполните поле')
        .email('некорректный email'),
    password: yup
        .string()
        .required('заполните поле')
        .matches(/[A-ZА-ЯЁ]/, 'должен содержать заглавные символы')
        .matches(/[a-zа-яё]/, 'должен содержать cтрочные символы')
        .matches(/\d/, 'должен содержать цифры')
        .min(8, 'минимум 8 символов'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
})

const SignUp: FC<Props> = ({ signUp }) => {
    const { handleSubmit, values, errors, touched, handleChange, handleBlur, status, isSubmitting } = useFormik({
        initialValues: { username: '', email: '', password: '', confirmPassword: '' },
        validationSchema: schema,
        onSubmit: async ({ username, email, password }, { setSubmitting, setStatus }) => {
            await signUp({ username, email, password }, setStatus)
            setSubmitting(false)
        }
    })

    return <Box maxWidth={360} mx='auto'>
        <Card elevation={3}>
            <Box p={2}>
                <Typography align='center' variant='h6' gutterBottom>
                    Регистрация
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <ErrorMessage
                        msg={status}
                        show={!!status}
                    />
                    <Box py={1}>
                        <TextField
                            name='username'
                            autoComplete='off'
                            label='Имя'
                            size='small'
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            fullWidth
                        />
                        <ErrorMessage
                            show={!!(touched.username && errors.username)}
                            msg={errors.username?.toString()}
                        />
                    </Box>
                    <Box py={1}>
                        <TextField
                            name='email'
                            autoComplete='off'
                            label='Email'
                            size='small'
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            fullWidth
                        />
                        <ErrorMessage
                            show={!!(touched.email && errors.email)}
                            msg={errors.email?.toString()}
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
                            show={!!touched.password}
                            msg={errors.password?.toString()}
                        />
                    </Box>
                    <Box py={1}>
                        <PasswordField
                            name='confirmPassword'
                            label='Пароль'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                        />
                        <ErrorMessage
                            show={!!(touched.confirmPassword && errors.confirmPassword)}
                            msg={errors.confirmPassword?.toString()}
                        />
                    </Box>
                    <Box py={1}>
                        <Typography align='center'>
                            Уже есть аккаунт?{' '}<Link to='/signin'>Войти</Link>
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

export default connect(null, mapDispatchToProps)(SignUp)