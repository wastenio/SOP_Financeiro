import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PagamentoForm from '../features/pagamentos/PagamentoForm';
import PagamentoList from '../features/pagamentos/PagamentoList';
import { fetchPagamentos } from '../features/pagamentos/pagamentoSlice';
import { toast } from 'react-toastify';

const PagamentosPage = () => {
  const dispatch = useDispatch();
  const { items: pagamentos, status, error } = useSelector((state) => state.pagamentos);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPagamentos());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cadastro de Pagamentos</h2>

      {isLoading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status" aria-label="Carregando pagamentos" />
          <span className="ms-2">Carregando pagamentos...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Novo Pagamento</h5>
              <PagamentoForm isLoading={isLoading} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Pagamentos Cadastrados</h5>
              {pagamentos.length === 0 && !isLoading ? (
                <p className="text-center">Nenhum pagamento cadastrado.</p>
              ) : (
                <PagamentoList pagamentos={pagamentos} isLoading={isLoading} error={error} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagamentosPage;
