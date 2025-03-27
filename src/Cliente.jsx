import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getClientes } from "./Utility/apiClientes";
import { getPrestamoInteresCuota } from "./Utility/apiPrestamoInteresCuota";
import Layout from "./Layout";
import Paginador from "./paginacion/Paginador";

function Cliente() {
  const [prestamo, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 10;

  const cargarDatos = async () => {
    try {
      const response = await getPrestamoInteresCuota();
      if (response.data && Array.isArray(response.data)) {
        setPrestamos(response.data);
      } else {
        setPrestamos([]);
      }
      setLoading(false);
    } catch (err) {
      setError("Error al cargar los datos");
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const filteredPrestamos = (prestamo || []).filter(
    (p) =>
      p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clienteId?.toString().includes(searchTerm)
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPrestamos.length / rowsPerPage)
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPrestamos.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div>
      <div>
        <Layout></Layout>
      </div>
      <div className="container">
        <div className="row">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
          />
          <div className="card-body p-4 col-12 col-md-6">
            <div className="card shadow border-0 mt-4">
              <div className="card-header bg-secondary bg-gradient ml-0 py-3">
                <div className="row">
                  <div className="col-12 text-center">
                    <h1 className="text-white">
                      Clientes <i className="bi bi-cash-coin"></i>
                    </h1>
                  </div>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>ClienteId</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ...new Map(
                      currentRows.map((p) => [p.clienteId, p])
                    ).values(),
                  ].map((prestamo, index) => (
                    <tr key={`${prestamo.clienteId}-${index}`}>
                      <td>{prestamo.clienteId}</td>
                      <td>{prestamo.nombre}</td>
                      <td>{prestamo.apellido}</td>
                      <td>{prestamo.telefono}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                <Paginador
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
            </div>
          </div>

          <div className="card-body p-4 col-12 col-md-6">
            <div className="card shadow border-0 mt-4">
              <div className="card-header bg-secondary bg-gradient ml-0 py-3">
                <div className="row">
                  <div className="col-12 text-center">
                    <h1 className="text-white">
                      Inf. Prestamo <i className="bi bi-cash-coin"></i>
                    </h1>
                  </div>
                </div>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <span>Cantidad</span> <br /> <span>Cuotas</span>
                    </th>
                    <th>Fecha</th>
                    <th>Interes</th>
                    <th>CuotaMensual</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((prestamo, index) =>
                    prestamo.cuotaId && prestamo.interesId ? (
                      <tr key={`${prestamo.cuotaId}-${index}`}>
                        <td>{prestamo.cantidadCuotas}</td>
                        <td>{prestamo.fechaPrestamo}</td>
                        <td>{prestamo.interesGenerado}</td>
                        <td>{prestamo.valorCuota}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>              
                <Paginador
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cliente;
