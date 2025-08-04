import axios from "axios";

const API=axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`
})

export const fetchAllBooks= ()=> API.get('/');
export const fetchBook= (id)=> API.get(`/${id}`);
export const createBook= (data)=> API.post('/',data);
export const updateBook= (id,data)=> API.put(`/${id}`,data);
export const deleteBook= (id)=> API.delete(`/${id}`);