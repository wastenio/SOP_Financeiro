import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Bem-vindo ao Sistema <span className="text-primary">SOP</span></h1>
        <p className="lead">Escolha uma funcionalidade abaixo:</p>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Card Despesas */}
        <div className="col-sm-6 col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-cash-coin display-4 text-primary mb-3"></i>
              <h5 className="card-title">Despesas</h5>
              <p className="card-text">Gerencie os registros de despesas da sua organização.</p>
              <Link to="/despesas" className="btn btn-outline-primary mt-2">
                Acessar
              </Link>
            </div>
          </div>
        </div>

        {/* Card Empenhos */}
        <div className="col-sm-6 col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-journal-bookmark display-4 text-success mb-3"></i>
              <h5 className="card-title">Empenhos</h5>
              <p className="card-text">Registre e acompanhe os empenhos firmados.</p>
              <Link to="/empenhos" className="btn btn-outline-success mt-2">
                Acessar
              </Link>
            </div>
          </div>
        </div>

        {/* Card Pagamentos */}
        <div className="col-sm-6 col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-credit-card-2-front display-4 text-warning mb-3"></i>
              <h5 className="card-title">Pagamentos</h5>
              <p className="card-text">Visualize e controle os pagamentos realizados.</p>
              <Link to="/pagamentos" className="btn btn-outline-warning mt-2">
                Acessar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
