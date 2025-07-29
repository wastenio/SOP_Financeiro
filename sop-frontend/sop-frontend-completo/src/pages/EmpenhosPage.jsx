import EmpenhoForm from '../features/empenhos/EmpenhoForm';
import EmpenhoList from '../features/empenhos/EmpenhoList';
import { useSelector } from 'react-redux';

const EmpenhosPage = () => {
  const { status, error } = useSelector((state) => state.empenhos);

  const isLoading = status === 'loading';

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cadastro de Empenhos</h2>

      {isLoading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status" />
          <span className="ms-2">Carregando empenhos...</span>
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
              <h5 className="card-title">Novo Empenho</h5>
              <EmpenhoForm isLoading={isLoading} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Empenhos Cadastrados</h5>
              <EmpenhoList isLoading={isLoading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpenhosPage;
