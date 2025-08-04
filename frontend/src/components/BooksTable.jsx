import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function getAge(publication_year)
{
    const currYear=new Date().getFullYear();
    return currYear-publication_year;
}

const booksTable= ({books, onEdit, onDelete})=>{
    const navigate=useNavigate();
    
    return(
        <table className="w-full text-left border">
            <thead>
                <tr className="bg-gray-150">
                    <th className="p-2">Title</th>
                    <th className="p-2">Age</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((book)=>(
                        <tr key={book.book_id} className="border-t">
                            <td className="p-2 text-blue-600 cursor-pointer hover:underline" 
                                onClick={()=>navigate(`/book/${book.book_id}`)}
                            >
                            {book.title}
                            </td>
                            <td className="p-2">
                                {getAge(book.publication_year)}
                            </td>
                            <td className="p-2">
                                {book.price}
                            </td>
                            <td classNAme="p-2 space-x-2">
                                <Button className="cursor-pointer bg-blue-700 hover:bg-blue-500 mx-2" onClick={() => onEdit(book)}>Edit</Button>
                                <Button variant="destructive" className="cursor-pointer" onClick={() => onDelete(book)}>Delete</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
export default booksTable;