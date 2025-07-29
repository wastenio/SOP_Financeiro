import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice'; // ajuste o caminho conforme seu projeto
import api from '../api';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ userName: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const response = await api.post('/auth/login', form);
      dispatch(loginSuccess({ token: response.data.token }));
      navigate('/');
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Usuário"
          value={form.userName}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, marginBottom: 15 }}>
          Entrar
        </button>
      </form>

      <button
        onClick={() => navigate('/register')}
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 4,
        }}
      >
        Cadastrar-se
      </button>
    </div>
  );
};

export default LoginPage;
