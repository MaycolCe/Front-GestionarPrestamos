import { useState } from "react";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

const Paginator = ({ currentPage, totalPages, setCurrentPage }) => (
  <div>
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      {"< Anterior"}
    </button>

    <span> Página {currentPage} de {totalPages} </span>

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      {"Siguiente >"}
    </button>
  </div>
);

const Paginador = ({ clientes = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 10;

  const prestamos = clientes.flatMap((cliente) =>
    Array.isArray(cliente.prestamo) ? cliente.prestamo.map((prestamo) => ({
      ...prestamo,
      clienteId: cliente.clienteId,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      prestamoId: prestamo.prestamoId
    })) : []
  );

  const filteredPrestamos = prestamos.filter(prestamo =>
    prestamo.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prestamo.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prestamo.clienteId?.toString().includes(searchTerm) ||
    prestamo.prestamoId?.toString().includes(searchTerm)
  );

  const totalPages = Math.max(1, Math.ceil(filteredPrestamos.length / rowsPerPage));
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPrestamos.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="d-flex justify-content-center mt-3">
        <Paginator currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />      
    </div>
  );
};

export default Paginador;
