import { useState } from "react";

/**
 * Componente para mostrar una tabla paginada de préstamos con información de clientes.
 * 
 * @param {Array} clientes - Lista de clientes con sus respectivos préstamos.
 */
const PaginatedTable = ({ clientes }) => {
  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Número de filas a mostrar por página

  /**
   * Transformamos los datos para obtener una lista de préstamos
   * con información del cliente asociada a cada préstamo.
   */
  const prestamos = clientes.flatMap(cliente =>
    cliente.prestamo.map(prestamo => ({
      ...prestamo,
      clienteId: cliente.clienteId,
      nombre: cliente.nombre,
      apellido: cliente.apellido
    }))
  );

  // Cálculo de los índices de la paginación
  const indexOfLastRow = currentPage * rowsPerPage; // Último índice de la página actual
  const indexOfFirstRow = indexOfLastRow - rowsPerPage; // Primer índice de la página actual
  const currentRows = prestamos.slice(indexOfFirstRow, indexOfLastRow); // Filas actuales a mostrar

  // Calcular el número total de páginas
  const totalPages = Math.ceil(prestamos.length / rowsPerPage);

  return (
    <div>
      {/* Tabla de datos */}
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
          {currentRows.map((prestamo, index) => (
            <tr key={`${prestamo.clienteId}-${index}`}>
              <td>{prestamo.clienteId}</td>
              <td>{prestamo.nombre}</td>
              <td>{prestamo.apellido}</td>
              <td>{prestamo.prestamoId}</td>
              <td>{new Date(prestamo.fechaPrestamo).toLocaleDateString()}</td>
              <td>{prestamo.cantidadPago}</td>
              <td>{prestamo.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <div>
        {/* Botón de página anterior */}
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          {"< Anterior"}
        </button>
        
        {/* Indicador de página actual */}
        <span> Página {currentPage} de {totalPages} </span>
        
        {/* Botón de página siguiente */}
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          {"Siguiente >"}
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;