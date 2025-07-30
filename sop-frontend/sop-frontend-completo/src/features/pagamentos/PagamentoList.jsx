import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPagamentos, deletePagamento } from './pagamentoSlice';

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

const PagamentoList = () => {
  const dispatch = useDispatch();
  const { items: pagamentos, status, error } = useSelector((state) => state.pagamentos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPagamentos());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    if (window.confirm('Confirma exclusão deste pagamento?')) {
      dispatch(deletePagamento(id));
    }
  };

  if (status === 'loading') {
    return (
      <p role="status" aria-live="polite">
        Carregando pagamentos...
      </p>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert" aria-live="assertive">
        {error}
      </div>
    );
  }

  if (status === 'succeeded' && pagamentos.length === 0) {
    return <p>Nenhum pagamento cadastrado.</p>;
  }

  return (
    <div>
      <h3>Lista de Pagamentos</h3>
      <ul className="list-group">
        {pagamentos.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{p.numeroPagamento}</strong> - {formatDate(p.dataPagamento)} -{' '}
              {formatCurrency(p.valorPago)} - Empenho: {p.empenho?.numeroEmpenho || 'N/A'}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(p.id)}
              aria-label={`Excluir pagamento número ${p.numeroPagamento}`}
              disabled={status === 'loading'}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PagamentoList;
