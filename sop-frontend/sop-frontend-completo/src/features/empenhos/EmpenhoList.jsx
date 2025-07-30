import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpenhos, deleteEmpenho } from './empenhoSlice';

const EmpenhoList = ({ isLoading: externalLoading, error: externalError }) => {
  const dispatch = useDispatch();
  const { items: empenhos, status, error, deleteStatus } = useSelector((state) => state.empenhos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmpenhos());
    }
  }, [dispatch, status]);

  const displayError = externalError || error;
  const loading = externalLoading || status === 'loading';

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm('Confirma exclusão deste empenho?')) {
        dispatch(deleteEmpenho(id));
      }
    },
    [dispatch]
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return value != null
      ? value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      : '-';
  };

  if (loading && empenhos.length === 0) {
    return (
      <div className="text-center my-4" role="status" aria-live="polite">
        <div className="spinner-border" />
        <p>Carregando empenhos...</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Lista de Empenhos</h3>

      {displayError && <div className="alert alert-danger">{displayError}</div>}

      {!loading && empenhos.length === 0 && (
        <p className="text-center text-muted">Nenhum empenho cadastrado.</p>
      )}

      <ul className="list-group">
        {empenhos.map((e) => (
          <li
            key={e.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{e.numeroEmpenho}</strong> - {formatDate(e.dataEmpenho)} -{' '}
              {formatCurrency(e.valorEmpenhado)} - Despesa:{' '}
              {e.despesa?.numeroProtocolo || '-'}
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(e.id)}
              aria-label={`Excluir empenho ${e.numeroEmpenho}`}
              disabled={deleteStatus === 'loading'}
            >
              {deleteStatus === 'loading' ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpenhoList;
