import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPagamentos, deletePagamento } from './pagamentoSlice';

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
      <h3>Lista de Pagamentos</h3>

      {status === 'loading' && <p>Carregando pagamentos...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {status === 'succeeded' && pagamentos.length === 0 && <p>Nenhum pagamento cadastrado.</p>}

      <ul className="list-group">
        {pagamentos.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{p.numeroPagamento}</strong> - {formatDate(p.dataPagamento)} - {formatCurrency(p.valorPago)} - Empenho: {p.empenho?.numeroEmpenho}
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(p.id)}
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
