import { useState } from "react";

const PaginatedTable = ({ clientes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 10;

  const prestamos = clientes.flatMap(cliente =>
    cliente.prestamo.map(prestamo => ({
      ...prestamo,
      clienteId: cliente.clienteId,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      prestamoId: prestamo.prestamoId
    }))
  );

  // Filtrar los préstamos según el término de búsqueda
  const filteredPrestamos = prestamos.filter(prestamo =>
    prestamo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prestamo.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prestamo.clienteId.toString().includes(searchTerm) ||
    prestamo.prestamoId.toString().includes(searchTerm)
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPrestamos.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredPrestamos.length / rowsPerPage);

  return (
    <div>
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o ID"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      
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
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          {"< Anterior"}
        </button>
        
        <span> Página {currentPage} de {totalPages} </span>
        
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