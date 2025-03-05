import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="text-center">
        <div>
          <Layout></Layout>
        </div>
        <h1 className="display-4">
          Bienvenidos
          <br /> <br />
        </h1>
        <h2>
          Créditos <br /> Administrado su crédito fácil y rápido <br />
          <i className="bi bi-cash-stack"></i>{" "}
          <i className="bi bi-emoji-smile"></i>{" "}
          <i className="bi bi-currency-exchange"></i>
          <br />
          <br />
          <br />
        </h2>
      </div>
      <div className="row mt-5">
        <div className="col-xl-3 col-md-6 mt-5">
          <div className="card text-white mb-4">
            <Link to="/Cliente" style={{textDecoration:"none"}}>
            <div className="row">
              <button type="button" className="btn btn-secondary">
                <i className="bi bi-people-fill">
                  <br />
                </i>{" "}
                Usuarios
              </button>
            </div>
            </Link>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mt-5">
          <div className="card mb-4">
            <Link to="/Prestamos" style={{ textDecoration: "none" }}>
              <div className="row">              
                {/* <a className="btn btn-info"> */}
                <button type="button" className="btn btn-info text-white ">
                  <i className="bi bi-cash-coin">
                    <br />
                  </i>{" "}
                  Prestamos
                  </button>
                {/* </a> */}
              </div>
            </Link>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mt-5">
          <div className="card text-white mb-4">
            <div className="row">
              <button type="button" className="btn btn-success">
                <i className="bi bi-graph-up-arrow">
                  <br />
                </i>{" "}
                Intereses
              </button>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mt-5">
          <div className="card text-white mb-4">
            <div className="row">
              <button type="button" className="btn btn-danger">
                <i className="bi bi-coin">
                  <br />
                </i>{" "}
                Capital
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
