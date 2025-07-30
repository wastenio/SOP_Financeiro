import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DespesasPage from './pages/DespesasPage';
import EmpenhosPage from './pages/EmpenhosPage';
import PagamentosPage from './pages/PagamentosPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import { useSelector } from 'react-redux';
import React from 'react';
import Navbar from './components/Navbar';


function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/despesas"
            element={
              <ProtectedRoute>
                <DespesasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empenhos"
            element={
              <ProtectedRoute>
                <EmpenhosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pagamentos"
            element={
              <ProtectedRoute>
                <PagamentosPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
