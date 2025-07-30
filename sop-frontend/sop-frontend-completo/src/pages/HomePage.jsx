import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Despesas',
    description: 'Gerencie os registros de despesas da sua organização.',
    icon: 'bi-cash-coin',
    link: '/despesas',
    btnClass: 'btn-outline-primary',
    iconClass: 'text-primary',
  },
  {
    title: 'Empenhos',
    description: 'Registre e acompanhe os empenhos firmados.',
    icon: 'bi-journal-bookmark',
    link: '/empenhos',
    btnClass: 'btn-outline-success',
    iconClass: 'text-success',
  },
  {
    title: 'Pagamentos',
    description: 'Visualize e controle os pagamentos realizados.',
    icon: 'bi-credit-card-2-front',
    link: '/pagamentos',
    btnClass: 'btn-outline-warning',
    iconClass: 'text-warning',
  },
];

const FeatureCard = ({ title, description, icon, link, btnClass, iconClass }) => (
  <div className="col-sm-6 col-md-4">
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body text-center">
        <i className={`bi ${icon} display-4 ${iconClass} mb-3`} aria-hidden="true"></i>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link
          to={link}
          className={`btn ${btnClass} mt-2`}
          aria-label={`Acessar página de ${title}`}
        >
          Acessar
        </Link>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Bem-vindo ao Sistema <span className="text-primary">SOP</span>
        </h1>
        <p className="lead">Escolha uma funcionalidade abaixo:</p>
      </div>

      <div className="row g-4 justify-content-center">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
