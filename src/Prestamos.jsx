import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPrestamo } from "./Utility/apiPrestamo";

function Prestamos() {
  const [clientes, setClientes] = useState([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  //const navigate = useNavigate(); // Hook para la navegación

  // Función para cargar los datos desde la API
  const cargarDatos = async () => {
    try {
      const response = await getPrestamo(); // Llamada a la API
      setClientes(response.data); // Guardar los datos en el estado
      setLoading(false);
    } catch (err) {
      setError("Error al cargar los datos");
      setLoading(false);
      //navigate("/errorpage"); // Redirigir a la página de error
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <i className="bi bi-house-door fs-3" style={{ color: "white" }}></i>
        </Link>
      </div>

      <div className="card shadow border-0 mt-4">
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="text-white">
                Lista de Préstamos <i className="bi bi-cash-coin"></i>
              </h1>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <table className="table">
            <thead>
              <tr>
                <th>ClienteId</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>PrestamoId</th>
                <th>Fecha Prestamo</th>
                <th>Cantidad Pago</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) =>
                cliente.prestamo.map((prestamo, index) => (
                  <tr key={`${cliente.clienteId}-${index}`}>
                    <td>{cliente.clienteId}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.apellido}</td>
                    <td>{prestamo.prestamoId}</td>
                    <td>
                      {new Date(prestamo.fechaPrestamo).toLocaleDateString()}
                    </td>
                    <td>{prestamo.cantidadPago}</td>
                    <td>{prestamo.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Prestamos;
