import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmpenho, fetchEmpenhos } from './empenhoSlice';
import axios from 'axios';

const EmpenhoForm = () => {
  const dispatch = useDispatch();
  const [despesas, setDespesas] = useState([]);

  const [form, setForm] = useState({
    numeroEmpenho: '',
    dataEmpenho: '',
    valorEmpenhado: '',
    despesa: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/despesas')
      .then(res => setDespesas(res.data))
      .catch(err => console.error('Erro ao carregar despesas:', err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...form,
      valorEmpenhado: parseFloat(form.valorEmpenhado),
      despesa: {
        id: parseInt(form.despesa)
      }
    };
    await dispatch(addEmpenho(payload));
    await dispatch(fetchEmpenhos());
    setForm({
      numeroEmpenho: '',
      dataEmpenho: '',
      valorEmpenhado: '',
      despesa: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        name="numeroEmpenho"
        value={form.numeroEmpenho}
        onChange={handleChange}
        placeholder="Número do Empenho"
        required
      />
      <input
        type="date"
        name="dataEmpenho"
        value={form.dataEmpenho}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        step="0.01"
        name="valorEmpenhado"
        value={form.valorEmpenhado}
        onChange={handleChange}
        placeholder="Valor Empenhado"
        required
      />
      <select
        name="despesa"
        value={form.despesa}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma Despesa</option>
        {despesas.map(d => (
          <option key={d.id} value={d.id}>
            {d.numeroProtocolo} - {d.tipoDespesa}
          </option>
        ))}
      </select>
      <button type="submit">Salvar Empenho</button>
    </form>
  );
};

export default EmpenhoForm;
