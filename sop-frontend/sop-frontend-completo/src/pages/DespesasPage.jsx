import { useEffect, useState } from 'react';
import api from '../api';
import DespesaForm from '../features/despesas/DespesaForm';
import DespesaList from '../features/despesas/DespesaList';

const DespesasPage = () => {
  const [despesas, setDespesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDespesas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/despesas');
      setDespesas(response.data);
    } catch (err) {
      setError('Erro ao carregar despesas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDespesas();
  }, []);

  const handleAddDespesa = async (novaDespesa) => {
    setError(null);
    try {
      // Adaptar datas para backend, se precisar
      const payload = {
        ...novaDespesa,
        valor: parseFloat(novaDespesa.valor),
        dataProtocolo: new Date(novaDespesa.dataProtocolo).toISOString(),
        dataVencimento: new Date(novaDespesa.dataVencimento).toISOString().split('T')[0],
      };

      const response = await api.post('/despesas', payload);
      setDespesas((prev) => [...prev, response.data]);
      toast.success('Despesa salva com sucesso!');
    } catch (err) {
      toast.error('Erro ao salvar despesa');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cadastro de Despesas</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Nova Despesa</h5>
              <DespesaForm onSubmit={handleAddDespesa} />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Despesas Cadastradas</h5>
              <DespesaList despesas={despesas} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DespesasPage;
