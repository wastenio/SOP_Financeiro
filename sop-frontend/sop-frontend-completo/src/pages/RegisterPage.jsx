import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useState } from 'react';

const schema = yup.object().shape({
  userName: yup.string().required('Usuário é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter ao menos 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'As senhas devem coincidir')
    .required('Confirmação da senha é obrigatória'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const { userName, email, password } = data;
      await api.post('/usuario/register', { userName, email, password });
      setSubmitSuccess('Cadastro realizado com sucesso! Você será redirecionado para login.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setSubmitError(err.response?.data || 'Erro ao cadastrar usuário');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Cadastro de Usuário</h2>

      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
      {submitSuccess && <p style={{ color: 'green' }}>{submitSuccess}</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="userName">Usuário</label>
          <input
            id="userName"
            type="text"
            {...register('userName')}
            style={{ width: '100%', padding: 8 }}
            disabled={isSubmitting}
          />
          <p style={{ color: 'red' }}>{errors.userName?.message}</p>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            style={{ width: '100%', padding: 8 }}
            disabled={isSubmitting}
          />
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            style={{ width: '100%', padding: 8 }}
            disabled={isSubmitting}
          />
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="confirmPassword">Confirme a senha</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            style={{ width: '100%', padding: 8 }}
            disabled={isSubmitting}
          />
          <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            borderRadius: 4,
          }}
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
