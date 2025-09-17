import axios from "./axios.customize";

const createUserApi = (email, name, password) => {
 const  URL_API  = "v1/api/register";
 const data ={
    email, name, password
 }
 return axios.post(URL_API, data); 
}

export {
    createUserApi
}
