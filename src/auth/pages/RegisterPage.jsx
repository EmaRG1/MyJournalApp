import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks/useForm';

import { checkingEmailPasswordSignIn } from '../../store/auth/thunks';
import { useMemo } from 'react';

const formData = { email: '', password: '', displayName: '' }

export const RegisterPage = () => {

  const dispatch = useDispatch();

 

  const { onInputChange, email, password, displayName, formState } = useForm(formData);

  const { status, errorMessage } = useSelector(state => state.auth)
  
  const isCheckingStatus = useMemo(() => status === 'checking' , [status])

  const onSubmit = (event) => { 
    event.preventDefault();
    dispatch(checkingEmailPasswordSignIn(formState))

  }
  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={ onSubmit }>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                name='displayName'
                placeholder='Nombre completo' 
                value={ displayName }
                onChange={ onInputChange }
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                name='email'
                placeholder='correo@google.com' 
                value={ email }
                onChange={ onInputChange }
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                name='password'
                placeholder='Contraseña' 
                value={ password }
                onChange={ onInputChange }
                fullWidth
              />
          </Grid>
          {
            errorMessage &&
            <>
              <Grid item mt={2} xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert  severity="error">
                  {errorMessage}
                </Alert>
              </Grid>
            </>
          }
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button disabled={ isCheckingStatus } type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
