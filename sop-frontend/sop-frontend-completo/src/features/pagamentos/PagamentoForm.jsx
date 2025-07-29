import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPagamento, fetchPagamentos } from './pagamentoSlice';
import axios from 'axios';

const PagamentoForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.pagamentos);

  const [empenhos, setEmpenhos] = useState([]);
  const [form, setForm] = useState({
    numeroPagamento: '',
    dataPagamento: '',
    valorPago: '',
    empenho: '',
  });

  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchEmpenhos = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/empenhos');
        setEmpenhos(res.data);
      } catch (err) {
        console.error('Erro ao carregar empenhos:', err);
      }
    };
    fetchEmpenhos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const payload = {
      ...form,
      valorPago: parseFloat(form.valorPago),
      empenho: { id: parseInt(form.empenho, 10) },
    };

    try {
      const resultAction = await dispatch(addPagamento(payload));
      if (addPagamento.fulfilled.match(resultAction)) {
        setSuccessMsg('Pagamento salvo com sucesso!');
        setForm({
          numeroPagamento: '',
          dataPagamento: '',
          valorPago: '',
          empenho: '',
        });
        dispatch(fetchPagamentos());
      }
    } catch {
      // Erro já tratado no slice, não precisa fazer nada aqui
    }
  };

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <input
        type="text"
        name="numeroPagamento"
        value={form.numeroPagamento}
        onChange={handleChange}
        placeholder="Número do Pagamento"
        required
        disabled={isLoading}
      />
      <input
        type="date"
        name="dataPagamento"
        value={form.dataPagamento}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <input
        type="number"
        step="0.01"
        name="valorPago"
        value={form.valorPago}
        onChange={handleChange}
        placeholder="Valor Pago"
        required
        disabled={isLoading}
      />
      <select
        name="empenho"
        value={form.empenho}
        onChange={handleChange}
        required
        disabled={isLoading}
      >
        <option value="">Selecione um Empenho</option>
        {empenhos.map((e) => (
          <option key={e.id} value={e.id}>
            {e.numeroEmpenho} - R$ {e.valorEmpenhado}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Salvando...' : 'Salvar Pagamento'}
      </button>
    </form>
  );
};

export default PagamentoForm;
