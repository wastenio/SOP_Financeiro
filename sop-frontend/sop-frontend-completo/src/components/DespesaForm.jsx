import React, { useState } from 'react';

const DespesaForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    credor: '', numeroProtocolo: '', descricao: '',
    tipoDespesa: '', status: '', valor: '', dataProtocolo: '', dataVencimento: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="credor" placeholder="Credor" onChange={handleChange} required />
      <input name="numeroProtocolo" placeholder="Número Protocolo" onChange={handleChange} required />
      <input name="descricao" placeholder="Descrição" onChange={handleChange} required />
      <input name="tipoDespesa" placeholder="Tipo Despesa" onChange={handleChange} required />
      <input name="status" placeholder="Status" onChange={handleChange} required />
      <input name="valor" type="number" placeholder="Valor" onChange={handleChange} required />
      <input name="dataProtocolo" type="datetime-local" onChange={handleChange} required />
      <input name="dataVencimento" type="date" onChange={handleChange} required />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default DespesaForm;
