import { IconButton, InputAdornment, TextField, TextFieldProps } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { useState } from "react"

const PasswordField = (props: TextFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return <TextField
        type={showPassword ? 'text' : 'password'}
        size='small'
        variant="outlined"
        fullWidth
        InputProps={{
            endAdornment: <InputAdornment position="end">
                <IconButton
                    size='small'
                    onClick={() => setShowPassword(show => !show)}
                >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>,
        }}
        {...props}
    />
}

export default PasswordField