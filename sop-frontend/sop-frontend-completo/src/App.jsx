import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DespesasPage from './pages/DespesasPage';
import EmpenhosPage from './pages/EmpenhosPage';
import PagamentosPage from './pages/PagamentosPage';
import Navbar from './components/Navbar';
import React from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/despesas" element={<DespesasPage />} />
          <Route path="/empenhos" element={<EmpenhosPage />} />
          <Route path="/pagamentos" element={<PagamentosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
