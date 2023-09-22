import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RegisterRequestData } from '@services/api/types';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { useDispatch } from '@services/hooks';
import { userThunks } from '@services/slices/user-slice';
import { ERROR_MESSAGE, InputNames, REQUIRED_MESSAGE, validationTemplate } from '@utils/validation';
import { useRef } from 'react';

export const Registration = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: "onChange"
  });

  const dispatch = useDispatch();
  const passwordRef = useRef<HTMLInputElement>();

  const onSubmit: SubmitHandler<RegisterRequestData> = data => {
    dispatch(userThunks.registration(data))
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
            rules={validationTemplate(InputNames.NAME)}
            render={({field}) => (
              <TextField
                type='text'
                variant='standard'
                label="FirstName"
                value={field.value}
                onChange={field.onChange}
                error={!!errors.firstName?.message}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={validationTemplate(InputNames.NAME)}
            render={({field}) => (
              <TextField
                type='text'
                variant='standard'
                label="LastName"
                value={field.value}
                onChange={field.onChange}
                error={!!errors.lastName?.message}
                helperText={errors.lastName?.message}
              />
            )}
          />
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
                inputRef={passwordRef}
                type='password'
                label="Password"
                value={field.value}
                onChange={field.onChange}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: REQUIRED_MESSAGE,
              validate: (value: string) => {
                if (value === passwordRef.current?.value) {
                  return true
                }
                return ERROR_MESSAGE.CONFIRM_PASSWORD;
              }
            }}
            render={({field}) => (
              <TextField
                variant='standard'
                type='password'
                label="Confirm password"
                value={field.value}
                onChange={field.onChange}
                error={!!errors.confirmPassword?.message}
                helperText={errors.confirmPassword?.message}
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
      <NavLink to={ROUTES.login.path} className="navLink">Есть аккаунт?</NavLink>
    </Box>
  )
}
