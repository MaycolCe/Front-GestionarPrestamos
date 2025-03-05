import axios from "axios";

const getClientes = async ()=>{
    const response = await axios.get("https://localhost:7278/Api/Cliente/Clientes");
    return response;
}

export {getClientes};