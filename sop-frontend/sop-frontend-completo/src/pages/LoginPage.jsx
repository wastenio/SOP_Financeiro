import LoginForm from '../features/auth/LoginForm';

const LoginPage = () => {
  const handleLoginSuccess = () => {
    window.location.href = '/'; // redireciona após login
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
