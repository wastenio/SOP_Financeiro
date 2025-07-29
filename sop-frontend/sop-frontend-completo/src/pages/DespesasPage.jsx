import DespesaForm from '../features/despesas/DespesaForm';
import DespesaList from '../features/despesas/DespesaList';

const DespesasPage = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cadastro de Despesas</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Nova Despesa</h5>
              <DespesaForm />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Despesas Cadastradas</h5>
              <DespesaList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DespesasPage;
