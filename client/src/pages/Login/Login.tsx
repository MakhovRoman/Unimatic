import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LoginRequestData } from '@services/api/types';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { useDispatch, useSelector } from '@services/hooks';
import { selectUserData, userThunks } from '@services/slices/user-slice';
import { InputNames, validationTemplate } from '@utils/validation';
import { Loader } from '@components/loader/loader';

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
  const user = useSelector(selectUserData);

  const onSubmit: SubmitHandler<LoginRequestData> = async (data) => {
    dispatch(userThunks.login(data))
  }

  return (
    <>
      {
        !user.isLoading
        ?
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
                    type='password'
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
          {
            user.error &&
              <Box
                mt={2}
                fontSize={14}
                color={'red'}
                textAlign={'center'}
              >{user.error}</Box>
          }
        </Box>
        :
        <Loader />
      }
    </>
  )
}
