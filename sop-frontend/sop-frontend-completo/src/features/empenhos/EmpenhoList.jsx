import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpenhos, deleteEmpenho } from './empenhoSlice';

const EmpenhoList = ({ isLoading, error: externalError }) => {
  const dispatch = useDispatch();
  const { items: empenhos, status, error } = useSelector((state) => state.empenhos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmpenhos());
    }
  }, [dispatch, status]);

  const displayError = externalError || error;

  const handleDelete = (id) => {
    if (window.confirm('Confirma exclusão deste empenho?')) {
      dispatch(deleteEmpenho(id));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return value?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div>
      <h3>Lista de Empenhos</h3>

      {isLoading && <p>Carregando empenhos...</p>}
      {displayError && <div className="alert alert-danger">{displayError}</div>}

      {(!isLoading && empenhos.length === 0) && <p>Nenhum empenho cadastrado.</p>}

      <ul className="list-group">
        {empenhos.map((e) => (
          <li key={e.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{e.numeroEmpenho}</strong> - {formatDate(e.dataEmpenho)} - {formatCurrency(e.valorEmpenhado)} - Despesa: {e.despesa?.numeroProtocolo}
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(e.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpenhoList;
