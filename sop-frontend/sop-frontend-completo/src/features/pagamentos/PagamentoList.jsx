import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPagamentos, deletePagamento } from './pagamentoSlice';

const PagamentoList = () => {
  const dispatch = useDispatch();
  const pagamentos = useSelector(state => state.pagamentos.items);

  useEffect(() => {
    dispatch(fetchPagamentos());
  }, [dispatch]);

  return (
    <div>
      <h3>Lista de Pagamentos</h3>
      <ul>
        {pagamentos.map(p => (
          <li key={p.id}>
            {p.numeroPagamento} - {p.dataPagamento} - R$ {p.valorPago} - Empenho: {p.empenho?.numeroEmpenho}
            <button onClick={() => dispatch(deletePagamento(p.id))}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PagamentoList;
