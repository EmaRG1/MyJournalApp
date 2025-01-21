import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { checkingGoogleSignIn, startLoginWithEmailPassword } from '../../store/thunks';
import { useMemo } from 'react';


export const LoginPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth )

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm({ email: '', password: '' });
  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({email, password}))
  }

  const isAuthenticating = useMemo(() => status === 'checking', [status])
  const isAuthenticated = useMemo(() => status === 'authenticated', [status])


  const onGoogleSignIn = () => {
    dispatch(checkingGoogleSignIn())
  }
  
  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                name='email'
                onChange={onInputChange}
                value={email}
                placeholder='correo@google.com' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                name='password'
                onChange={onInputChange}
                value={password}
                placeholder='Contraseña' 
                fullWidth
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={ isAuthenticating } type='submit' variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={ isAuthenticating } onClick={ onGoogleSignIn } variant='contained' fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
          
            {
              errorMessage &&
                <>
                  <Grid item mb={2} xs={12} display={!!errorMessage ? '' : 'none'}>
                    <Alert  severity="error">
                      {errorMessage}
                    </Alert>
                  </Grid>
                </>
            }


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
