import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDespesa, fetchDespesas } from './despesaSlice';

const DespesaForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    numeroProtocolo: '',
    tipoDespesa: 'Obra de Edificação',
    dataProtocolo: '',
    dataVencimento: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(addDespesa(form));
    await dispatch(fetchDespesas());
    setForm({
      numeroProtocolo: '',
      tipoDespesa: 'Obra de Edificação',
      dataProtocolo: '',
      dataVencimento: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        name="numeroProtocolo"
        value={form.numeroProtocolo}
        onChange={handleChange}
        placeholder="Número do Protocolo"
        required
      />
      <select name="tipoDespesa" value={form.tipoDespesa} onChange={handleChange}>
        <option>Obra de Edificação</option>
        <option>Obra de Rodovias</option>
        <option>Outros</option>
      </select>
      <input
        type="date"
        name="dataProtocolo"
        value={form.dataProtocolo}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dataVencimento"
        value={form.dataVencimento}
        onChange={handleChange}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default DespesaForm;
