import { useState } from 'react';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../hooks/useAuth';
import { LoginDataDto, LoginDto } from '../../models/login.model';
import './login.scss';

export const Login: React.FC<LoginDto> = ({ users }) => {
  const { signin } = useAuth();
  const [loginData, setLoginData] = useState<LoginDataDto>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    })
  }

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = users.find((user) => user.email === loginData.email);
    const auth = user?.password === loginData.password;
    if (user && auth) {
      return signin(user);
    }
    return console.log("nop existe")
  }

  return (
    <form className="login-container d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
      <div className='title-login mb-3'>
        <h3>
          Login
        </h3>
      </div>
      <TextField className='mb-3' label="Correo" variant="outlined" type='email' name='email' onChange={handleChange} />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
        <OutlinedInput
          name='password'
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={handleChange}
        />
      </FormControl>
      <Button variant="outlined" type='submit'>Ingresar</Button>
    </form>

  )
}
