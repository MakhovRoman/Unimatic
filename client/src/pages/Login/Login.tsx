import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequestData } from '@services/api/types';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@router/routes';

export const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<LoginRequestData> = data => {
    console.log(data)
  }

  return (
    <Box sx={{
      width: "530px",
      height: 'fit-content'
    }}>
      <Typography variant='h1' gutterBottom>Login</Typography>
      <form name="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Controller
            name="email"
            control={control}
            render={({field}) => (
              <TextField
                type='text'
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
          <Button
            fullWidth={true}
            type='button'
            variant='contained'
            size='large'
          >
            LOGIN
          </Button>
        </Stack>
      </form>
      <NavLink to={ROUTES.registration.path} className="navLink">Не зарегистрировались?</NavLink>
    </Box>
  )
}
