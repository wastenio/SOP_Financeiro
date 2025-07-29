import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DespesaList from './pages/DespesaList';
import EmpenhoList from './pages/EmpenhoList';
import PagamentoList from './pages/PagamentoList';

function App() {
  return (
    <Routes>
      <Route path="/despesas" element={<DespesaList />} />
      <Route path="/empenhos" element={<EmpenhoList />} />
      <Route path="/pagamentos" element={<PagamentoList />} />
    </Routes>
  );
}

export default App;
