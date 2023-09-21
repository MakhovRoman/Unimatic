import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RegisterRequestData } from '@services/api/types';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { userAPI } from '@services/api/userApi';

export const Registration = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<RegisterRequestData> = data => {
    userAPI.registration(data)
  }

  return (
    <Box sx={{
      width: "530px",
      height: 'fit-content'
    }}>
      <Typography variant='h1' gutterBottom>Registration</Typography>
      <form name="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
        <Controller
            name="firstName"
            control={control}
            render={({field}) => (
              <TextField
                type='text'
                variant='standard'
                label="FirstName"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({field}) => (
              <TextField
                type='text'
                variant='standard'
                label="LastName"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <TextField
                type='email'
                variant='standard'
                label="E-mail"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field}) => (
              <TextField
                variant='standard'
                label="Password"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({field}) => (
              <TextField
                variant='standard'
                label="Confirm password"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Button
            fullWidth={true}
            type='submit'
            variant='contained'
            size='large'
          >
            LOGIN
          </Button>
        </Stack>
      </form>
      <NavLink to={ROUTES.login.path} className="navLink">Есть аккаунт?</NavLink>
    </Box>
  )
}
