import React, { useEffect, useState } from 'react';
import { fetchAllBooks, createBook, updateBook, deleteBook } from '../services/api.js';
import BooksTable from '../components/BooksTable';
import AddEditModal from '../components/addEditModal';
import DeleteModal from '../components/deleteModal';
import { Button } from '@/components/ui/button.jsx';
import toast from 'react-hot-toast';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const getBooks = async () => {
        try {
            const res = await fetchAllBooks();
            setBooks(res.data.data);
        } catch (err) {
            alert('Failed to fetch books');
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    const handleAddEdit = async (book) => {
        try {
            if (editData) {
                await updateBook(editData.book_id, book);
                toast.success("Book Updated Successfully");
            } else {
                await createBook(book);
                toast.success("Book Added Successfully");
            }
            getBooks();

        } catch (err) {
            toast.error("Operation Failed");
            alert(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBook(deleteTarget.book_id);
            setDeleteTarget(null);
            toast.success("Book Deleted Successfully");
            getBooks();
        } catch (err) {
            toast.error("Failed to delete book");
            alert('Failed to delete book');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-center text-4xl text-blue-700 font-bold mb-4">Book Management Portal</h1>
            <Button className="cursor-pointer bg-blue-700 hover:bg-blue-500 my-2" onClick={() => { setEditData(null); setShowModal(true); }}>
                Add New Book
            </Button>
            <BooksTable
                books={books}
                onEdit={(book) => {
                    setEditData(book);
                    setShowModal(true);
                }}
                onDelete={(book) => setDeleteTarget(book)}
            />
            {showModal && (
                <AddEditModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAddEdit}
                    initialData={editData}
                />
            )}

            {deleteTarget && (
                <DeleteModal
                    open={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={handleDelete}
                    student={deleteTarget}
                />
            )}


        </div>
    );
};

export default HomePage;