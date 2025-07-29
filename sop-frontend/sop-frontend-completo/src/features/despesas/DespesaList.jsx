import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDespesas, deleteDespesa } from './despesaSlice';

const DespesaList = () => {
  const dispatch = useDispatch();
  const despesas = useSelector(state => state.despesas.items);

  useEffect(() => {
    dispatch(fetchDespesas());
  }, [dispatch]);

  return (
    <div>
      <h3>Lista de Despesas</h3>
      <ul>
        {despesas.map(d => (
          <li key={d.id}>
            {d.numeroProtocolo} - {d.tipoDespesa} - {d.dataProtocolo} → {d.dataVencimento}
            <button onClick={() => dispatch(deleteDespesa(d.id))}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DespesaList;
