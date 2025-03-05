import axios from "axios";

const getPrestamo = async ()=>{
    const response = await axios.get("https://localhost:7278/Api/Cliente/Prestamos");
    return response;
}

export {getPrestamo};