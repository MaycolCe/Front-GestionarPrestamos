import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Layout = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark box-shadow mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Gestión Prestamos</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <Link className="nav-link" to="/"> <i className="bi bi-house-door"></i> Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/privacy"><i className="bi bi-shield"></i> Privacy</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-plus-circle"></i> Gestión
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/cliente"><i className="bi bi-people-fill"></i> Usuarios</Link></li>
                  <li><Link className="dropdown-item" to="/prestamos"><i className="bi bi-cash-coin"></i> Prestamos</Link></li>
                  <li><Link className="dropdown-item" to="/intereses"><i className="bi bi-graph-up-arrow"></i> Intereses</Link></li>
                  <li><Link className="dropdown-item" to="/capital"><i className="bi bi-coin"></i> Capital</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                </ul>
              </li>
            </ul>

            {/* Menú de sesión */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Registrar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Salir</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido dinámico de las páginas */}
      <div className="container">
        <main role="main" className="pb-3">
          <Outlet />
        </main>
      </div>

      {/* Footer
      <footer className="border-top footer text-muted">
        <div className="container text-center">
          <i className="bi bi-piggy-bank"></i> Gestión de Prestamos
        </div>
      </footer> */}
    </div>
  );
};

export default Layout;
