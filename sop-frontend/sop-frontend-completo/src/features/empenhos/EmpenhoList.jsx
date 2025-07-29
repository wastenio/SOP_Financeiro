import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpenhos, deleteEmpenho } from './empenhoSlice';

const EmpenhoList = () => {
  const dispatch = useDispatch();
  const empenhos = useSelector(state => state.empenhos.items);

  useEffect(() => {
    dispatch(fetchEmpenhos());
  }, [dispatch]);

  return (
    <div>
      <h3>Lista de Empenhos</h3>
      <ul>
        {empenhos.map(e => (
          <li key={e.id}>
            {e.numeroEmpenho} - {e.dataEmpenho} - R$ {e.valorEmpenhado} - Despesa: {e.despesa?.numeroProtocolo}
            <button onClick={() => dispatch(deleteEmpenho(e.id))}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpenhoList;
