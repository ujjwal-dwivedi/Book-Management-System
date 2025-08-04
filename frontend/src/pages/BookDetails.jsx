import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchBook } from '../services/api';

function getAge(publication_year)
{
    const currYear=new Date().getFullYear();
    return currYear-publication_year;
}

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook(id).then((res) => setBook(res.data.data))
      .catch(() => alert('Book not found'));
  }, [id]);

  if (!book) return <p className="text-center mt-10">Loading book details...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="mb-4">
        <Button variant="outline" className="cursor-pointer" onClick={() => navigate('/')}>
           Back to Home
        </Button>
      </div>

      <Card className="p-6 ">
        <h2 className="text-center text-2xl font-bold">{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Age:</strong> {getAge(book.publication_year)}</p>
        <p><strong>Publication Year:</strong> {book.publication_year}</p>
        <p><strong>Price:</strong> {book.price}</p>
        <p><strong>Updated At:</strong> {new Date(book.updated_at).toLocaleString("en-IN", {"timeZone": "Asia/Kolkata"})}</p>
      </Card>
    </div>
  );
};

export default BookDetails;