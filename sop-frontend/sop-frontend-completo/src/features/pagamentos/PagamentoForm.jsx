import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPagamento, fetchPagamentos } from './pagamentoSlice';
import axios from 'axios';

const PagamentoForm = () => {
  const dispatch = useDispatch();
  const [empenhos, setEmpenhos] = useState([]);

  const [form, setForm] = useState({
    numeroPagamento: '',
    dataPagamento: '',
    valorPago: '',
    empenho: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/empenhos')
      .then(res => setEmpenhos(res.data))
      .catch(err => console.error('Erro ao carregar empenhos:', err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...form,
      valorPago: parseFloat(form.valorPago),
      empenho: { id: parseInt(form.empenho) }
    };
    await dispatch(addPagamento(payload));
    await dispatch(fetchPagamentos());
    setForm({
      numeroPagamento: '',
      dataPagamento: '',
      valorPago: '',
      empenho: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        name="numeroPagamento"
        value={form.numeroPagamento}
        onChange={handleChange}
        placeholder="Número do Pagamento"
        required
      />
      <input
        type="date"
        name="dataPagamento"
        value={form.dataPagamento}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        step="0.01"
        name="valorPago"
        value={form.valorPago}
        onChange={handleChange}
        placeholder="Valor Pago"
        required
      />
      <select
        name="empenho"
        value={form.empenho}
        onChange={handleChange}
        required
      >
        <option value="">Selecione um Empenho</option>
        {empenhos.map(e => (
          <option key={e.id} value={e.id}>
            {e.numeroEmpenho} - R$ {e.valorEmpenhado}
          </option>
        ))}
      </select>
      <button type="submit">Salvar Pagamento</button>
    </form>
  );
};

export default PagamentoForm;
