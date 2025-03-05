import axios from "axios";

const getPrestamoInteresCuota = async ()=>{
    const response = await axios.get("https://localhost:7278/api/PrestamoInteresCliente/PrestamoInteresCuota");
    return response;
}

export {getPrestamoInteresCuota};

// const getPrestamoInteresCuota = async () => {
//     try {
//         const response = await axios.get("https://localhost:7278/api/PrestamoInteresCliente/PrestamoInteresCuota");
//         return response.data; // Retornamos solo los datos
//     } catch (error) {
//         console.error("Error al obtener los datos:", error);
//         throw error; // Propagar el error si es necesario
//     }
// };

// export { getPrestamoInteresCuota };
