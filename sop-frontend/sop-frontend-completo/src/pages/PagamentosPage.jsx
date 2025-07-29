import PagamentoForm from '../features/pagamentos/PagamentoForm';
import PagamentoList from '../features/pagamentos/PagamentoList';

const PagamentosPage = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cadastro de Pagamentos</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Novo Pagamento</h5>
              <PagamentoForm />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Pagamentos Cadastrados</h5>
              <PagamentoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagamentosPage;
