import EmpenhoForm from '../features/empenhos/EmpenhoForm';
import EmpenhoList from '../features/empenhos/EmpenhoList';

const EmpenhosPage = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cadastro de Empenhos</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Novo Empenho</h5>
              <EmpenhoForm />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Empenhos Cadastrados</h5>
              <EmpenhoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpenhosPage;
