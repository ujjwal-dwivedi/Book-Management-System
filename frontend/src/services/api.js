import axios from "axios";

const API=axios.create({
    baseURL: "http://localhost:3000/api/books"
})

export const fetchAllBooks= ()=> API.get('/');
export const fetchBook= (id)=> API.get(`/${id}`);
export const createBook= (data)=> API.post('/',data);
export const updateBook= (id,data)=> API.put(`/${id}`,data);
export const deleteBook= (id)=> API.delete(`/${id}`);