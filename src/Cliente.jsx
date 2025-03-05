// import React from 'react'
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { getClientes } from "./Utility/apiClientes";
import { getPrestamoInteresCuota } from "./Utility/apiPrestamoInteresCuota";
import Layout from "./Layout";

function Cliente() {
  // const [cliente, setClientes] = useState([]); // Estado para almacenar los datos
  const [prestamo, setPrestamos] = useState([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  //const navigate = useNavigate(); // Hook para la navegación

  // Función para cargar los datos desde la API
  const cargarDatos = async () => {
    try {
      // const response = await getClientes(); // Llamada a la API
      const response = await getPrestamoInteresCuota(); // Llamada a la API
      console.log(response.data); // Verificar los datos
      // setClientes(response.data); // Guardar los datos en el estado
      setPrestamos(response.data); // Guardar los datos en el estado
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
        <Layout></Layout>
      </div>
      <div className="container">
        <div className="row">
          <div className="card-body p-4 col-12 col-md-6">
            {/* <div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <i
                  className="bi bi-house-door fs-3"
                  style={{ color: "blue" }}
                ></i>
              </Link>
            </div> */}

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
                  {/* {prestamo.map((prestamo, index) => (
                    <tr key={`${prestamo.cliente.clienteId}-${index}`}>
                      <td>{prestamo.cliente.clienteId}</td>
                      <td>{prestamo.cliente.nombre}</td>
                      <td>{prestamo.cliente.apellido}</td>
                      <td>{prestamo.cliente.telefono}</td>
                    </tr>
                  ))} */}
                  {[...new Map(prestamo.map((p) => [p.cliente.clienteId, p])).values(),].map((prestamo, index) => (
                    <tr key={`${prestamo.cliente.clienteId}-${index}`}>
                      <td>{prestamo.cliente.clienteId}</td>
                      <td>{prestamo.cliente.nombre}</td>
                      <td>{prestamo.cliente.apellido}</td>
                      <td>{prestamo.cliente.telefono}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="card-body p-4 col-12 col-md-6"
            //style={{ marginTop: "41px" }}
          >
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
                    <th><span>Cantidad</span> <br/> <span>Cuotas</span></th>
                    <th>Fecha</th>
                    <th>Interes</th>
                    <th>CuotaMensual</th>
                  </tr>
                </thead>
                <tbody>
                  {prestamo.map((prestamo, index) =>
                    prestamo.cuota.length > 0 && prestamo.interes.length > 0 ? ( // Verificar que existan datos
                      <tr key={`${prestamo.cuota[0].cantidadCuotas}-${index}`}>{" "} {/* <td>{prestamo.cliente.apellido}</td> Acceder correctamente a cliente */}
                        <td>{prestamo.cuota[0].cantidadCuotas}</td>{" "} {/* Campo corregido */}
                        <td>{prestamo.fechaPrestamo}</td>{" "} {/* Nombre correcto del campo */}
                        <td>{prestamo.interes[0].interesGenerado}</td>{" "} {/* Acceder al primer interés */}
                        <td>{prestamo.cuota[0].valorCuota}</td>{" "} {/* Acceder correctamente a la cuota */}
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cliente;
