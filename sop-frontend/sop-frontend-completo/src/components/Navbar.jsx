import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

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
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
            </li>

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink to="/despesas" className="nav-link">
                    Despesas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/empenhos" className="nav-link">
                    Empenhos
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/pagamentos" className="nav-link">
                    Pagamentos
                  </NavLink>
                </li>
              </>
            )}

            {isAuthenticated ? (
              <>
                <li className="nav-item d-flex align-items-center mx-2 text-white">
                  Olá, {user?.nome || user?.email}
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-light">
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
