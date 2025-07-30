import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import api from '../api';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ userName: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await api.post('/auth/login', form);
      dispatch(loginSuccess({ token: response.data.token }));
      navigate('/');
    } catch (err) {
      setError('Usuário ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: '3rem' }}>
      <h2 className="mb-4 text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Usuário</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control"
            placeholder="Digite seu usuário"
            value={form.userName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <hr />

      <button
        onClick={() => navigate('/register')}
        className="btn btn-outline-secondary w-100"
        disabled={loading}
      >
        Cadastrar-se
      </button>
    </div>
  );
};

export default LoginPage;
