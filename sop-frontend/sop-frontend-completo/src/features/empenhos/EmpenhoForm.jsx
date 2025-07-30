import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmpenho, fetchEmpenhos } from './empenhoSlice';
import axios from 'axios';


const EmpenhoForm = ({ isLoading }) => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.empenhos);

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

    // Validação simples
    if (parseFloat(form.valorEmpenhado) <= 0) {
      alert('Valor Empenhado deve ser maior que zero');
      return;
    }

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
        dispatch(fetchEmpenhos());
        setTimeout(() => setSuccessMsg(''), 3000); // limpa msg depois de 3s
      }
    } catch {
      // erro já tratado no slice
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="mb-3">
        <label htmlFor="numeroEmpenho" className="form-label">Número do Empenho</label>
        <input
          type="text"
          id="numeroEmpenho"
          name="numeroEmpenho"
          className="form-control"
          value={form.numeroEmpenho}
          onChange={handleChange}
          placeholder="Número do Empenho"
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dataEmpenho" className="form-label">Data do Empenho</label>
        <input
          type="date"
          id="dataEmpenho"
          name="dataEmpenho"
          className="form-control"
          value={form.dataEmpenho}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="valorEmpenhado" className="form-label">Valor Empenhado</label>
        <input
          type="number"
          step="0.01"
          id="valorEmpenhado"
          name="valorEmpenhado"
          className="form-control"
          value={form.valorEmpenhado}
          onChange={handleChange}
          placeholder="Valor Empenhado"
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="despesa" className="form-label">Despesa Relacionada</label>
        <select
          id="despesa"
          name="despesa"
          className="form-select"
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
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading || status === 'loading'}>
        {status === 'loading' ? 'Salvando...' : 'Salvar Empenho'}
      </button>
    </form>
  );
};

export default EmpenhoForm;
