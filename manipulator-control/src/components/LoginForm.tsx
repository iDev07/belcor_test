import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Вход в систему
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('username', { required: 'Требуется имя пользователя' })}
            label="Имя пользователя"
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register('password', { required: 'Требуется пароль' })}
            label="Пароль"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
