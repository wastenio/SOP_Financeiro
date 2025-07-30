import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './authSlice';
import api from '../../api';
import { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', data);
      const { token, user } = response.data; // espera que a API retorne { token, user }

      // Dispara a action passando token e user
      dispatch(loginSuccess({ token, user }));

      onLoginSuccess();
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" {...register('email', { required: true })} />
      </div>

      <div className="mb-3">
        <label>Senha</label>
        <input type="password" className="form-control" {...register('password', { required: true })} />
      </div>

      <button type="submit" className="btn btn-primary">
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
