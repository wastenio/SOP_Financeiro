import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmpenho, fetchEmpenhos } from './empenhoSlice';
import axios from 'axios';

const EmpenhoForm = (isLoading ) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.empenhos);

  const [despesas, setDespesas] = useState([]);
  const [form, setForm] = useState({
    numeroEmpenho: '',
    dataEmpenho: '',
    valorEmpenhado: '',
    despesa: '',
  });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/despesas');
        setDespesas(res.data);
      } catch (err) {
        console.error('Erro ao carregar despesas:', err);
      }
    };
    fetchDespesas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const payload = {
      ...form,
      valorEmpenhado: parseFloat(form.valorEmpenhado),
      despesa: {
        id: parseInt(form.despesa, 10),
      },
    };

    try {
      const resultAction = await dispatch(addEmpenho(payload));
      if (addEmpenho.fulfilled.match(resultAction)) {
        setSuccessMsg('Empenho salvo com sucesso!');
        setForm({
          numeroEmpenho: '',
          dataEmpenho: '',
          valorEmpenhado: '',
          despesa: '',
        });
        dispatch(fetchEmpenhos()); // Atualiza lista após sucesso
      } else {
        setSuccessMsg('');
      }
    } catch {
      // erro já tratado no slice, pode deixar vazio
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <input
        type="text"
        name="numeroEmpenho"
        value={form.numeroEmpenho}
        onChange={handleChange}
        placeholder="Número do Empenho"
        required
        disabled={isLoading}
      />
      <input
        type="date"
        name="dataEmpenho"
        value={form.dataEmpenho}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <input
        type="number"
        step="0.01"
        name="valorEmpenhado"
        value={form.valorEmpenhado}
        onChange={handleChange}
        placeholder="Valor Empenhado"
        required
        disabled={isLoading}
      />
      <select
        name="despesa"
        value={form.despesa}
        onChange={handleChange}
        required
        disabled={isLoading}
      >
        <option value="">Selecione uma Despesa</option>
        {despesas.map((d) => (
          <option key={d.id} value={d.id}>
            {d.numeroProtocolo} - {d.tipoDespesa}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isLoading}>
        {status === 'loading' ? 'Salvando...' : 'Salvar Empenho'}
      </button>
    </form>
  );
};

export default EmpenhoForm;
