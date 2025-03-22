import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPrestamo } from "./Utility/apiPrestamo";
import PaginatedTable from "./paginacion/paginacionPrestamo"; // ✅ Importamos el componente de paginación
import Layout from "./Layout";

/**
 * Componente Prestamos
 * 
 * Este componente obtiene la lista de préstamos desde una API y la muestra 
 * en una tabla paginada utilizando el componente `PaginatedTable`.
 */
function Prestamos() {
  // Estado para almacenar la lista de clientes con sus préstamos
  const [clientes, setClientes] = useState([]);
  
  // Estado para manejar la carga de datos
  const [loading, setLoading] = useState(true);
  
  // Estado para manejar errores
  const [error, setError] = useState(null);

  /**
   * Efecto secundario para cargar los datos de los préstamos al montar el componente.
   */
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await getPrestamo(); // Llamada a la API
        setClientes(response.data); // Guardamos los datos en el estado
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos");
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // Si los datos aún están cargando, mostramos un mensaje de carga
  if (loading) return <div>Cargando...</div>;

  // Si ocurrió un error, mostramos el mensaje de error
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Botón para volver a la página principal */}
      <div>
        {/* <Link to="/" style={{ textDecoration: "none" }}>
          <i className="bi bi-house-door fs-3" style={{ color: "white" }}></i>
        </Link> */}
        <div>
        <Layout></Layout>
      </div>
      </div>

      <div className="card shadow border-0 mt-4">
        {/* Encabezado de la tarjeta */}
        <div className="card-header bg-secondary bg-gradient ml-0 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="text-white">
                Lista de Préstamos <i className="bi bi-cash-coin"></i>
              </h1>
            </div>
          </div>
        </div>

        {/* Cuerpo de la tarjeta donde se renderiza la tabla paginada */}
        <div className="card-body p-4">
          {/* ✅ Usamos el componente reutilizable de paginación */}
          <PaginatedTable clientes={clientes} />
        </div>
      </div>
    </div>
  );
}

export default Prestamos;

