import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const NavItem = ({ to, children }) => (
  <li className="nav-item">
    <NavLink 
      to={to} 
      className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
    >
      {children}
    </NavLink>
  </li>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const displayName = user?.nome || user?.email || 'Usuário';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          SOP Sistema
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <NavItem to="/">Home</NavItem>

            {isAuthenticated && (
              <>
                <NavItem to="/despesas">Despesas</NavItem>
                <NavItem to="/empenhos">Empenhos</NavItem>
                <NavItem to="/pagamentos">Pagamentos</NavItem>
              </>
            )}

            {isAuthenticated ? (
              <>
                <li className="nav-item d-flex align-items-center mx-2 text-white">
                  Olá, {displayName}
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light"
                    type="button"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <NavItem to="/login">Login</NavItem>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
