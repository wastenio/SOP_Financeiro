import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPagamento, fetchPagamentos } from './pagamentoSlice';
import api from '../../api';
  // usar axios customizado

const PagamentoForm = () => {
  const dispatch = useDispatch();
  const { addStatus, addError } = useSelector((state) => ({
    addStatus: state.pagamentos.addStatus,
    addError: state.pagamentos.addError,
  }));

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
        const res = await api.get('/empenhos');
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
    if (!form.numeroPagamento || !form.dataPagamento || !form.valorPago || !form.empenho) {
      return; // poderia exibir mensagem de erro aqui também
    }

    const payload = {
      ...form,
      valorPago: parseFloat(form.valorPago),
      empenho: { id: parseInt(form.empenho, 10) }, // confirmar formato esperado
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
      // erro já tratado no slice
    }
  };

  const isLoading = addStatus === 'loading';

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {addError && <div className="alert alert-danger">{addError}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="mb-3">
        <label htmlFor="numeroPagamento" className="form-label">Número do Pagamento</label>
        <input
          id="numeroPagamento"
          type="text"
          name="numeroPagamento"
          value={form.numeroPagamento}
          onChange={handleChange}
          className="form-control"
          placeholder="Número do Pagamento"
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dataPagamento" className="form-label">Data do Pagamento</label>
        <input
          id="dataPagamento"
          type="date"
          name="dataPagamento"
          value={form.dataPagamento}
          onChange={handleChange}
          className="form-control"
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="valorPago" className="form-label">Valor Pago</label>
        <input
          id="valorPago"
          type="number"
          step="0.01"
          name="valorPago"
          value={form.valorPago}
          onChange={handleChange}
          className="form-control"
          placeholder="Valor Pago"
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="empenho" className="form-label">Empenho</label>
        <select
          id="empenho"
          name="empenho"
          value={form.empenho}
          onChange={handleChange}
          className="form-select"
          required
          disabled={isLoading}
        >
          <option value="">Selecione um Empenho</option>
          {empenhos.map((e) => (
            <option key={e.id} value={e.id}>
              {e.numeroEmpenho} - R$ {Number(e.valorEmpenhado).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Salvando...' : 'Salvar Pagamento'}
      </button>
    </form>
  );
};

export default PagamentoForm;
