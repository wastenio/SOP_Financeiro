import React from 'react';
import DespesaForm from './components/DespesaForm';
import DespesaList from './components/DespesaList';
import axios from 'axios';

const App = () => {
  const handleSubmit = (form) => {
    axios.post('http://localhost:8080/despesas', form)
      .then(res => alert("Despesa salva!"))
      .catch(err => alert("Erro ao salvar despesa"));
  };

  return (
    <div>
      <h1>Sistema de Despesas</h1>
      <DespesaForm onSubmit={handleSubmit} />
      <DespesaList />
    </div>
  );
};

export default App;
