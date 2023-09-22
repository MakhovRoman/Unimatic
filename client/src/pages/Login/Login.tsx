import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequestData } from '@services/api/types';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { useDispatch } from '@services/hooks';
import { userThunks } from '@services/slices/user-slice';
import { InputNames, validationTemplate } from '@utils/validation';

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onChange"
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginRequestData> = async (data) => {
    dispatch(userThunks.login(data))
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
            rules={validationTemplate(InputNames.EMAIL)}
            render={({field}) => (
              <TextField
                type='email'
                variant='standard'
                label="E-mail"
                value={field.value}
                onChange={field.onChange}
                error={!!errors.email?.message}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={validationTemplate(InputNames.PASSWORD)}
            render={({field}) => (
              <TextField
                variant='standard'
                label="Password"
                value={field.value}
                onChange={field.onChange}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button
            fullWidth={true}
            type='submit'
            variant='contained'
            size='large'
            disabled={!isValid}
          >
            LOGIN
          </Button>
        </Stack>
      </form>
      <NavLink to={ROUTES.registration.path} className="navLink">Не зарегистрировались?</NavLink>
    </Box>
  )
}
