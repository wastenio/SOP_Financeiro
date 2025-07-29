import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DespesasPage from './pages/DespesasPage';
import EmpenhosPage from './pages/EmpenhosPage';
import PagamentosPage from './pages/PagamentosPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './features/auth/ProtectedRoute';
import React from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Rotas protegidas */}
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
