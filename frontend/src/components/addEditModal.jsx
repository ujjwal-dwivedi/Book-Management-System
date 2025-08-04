import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { validateBook } from '../lib/validator.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEditBookModal = ({ open, onClose, onSubmit, initialData }) => {
  const [data, setData] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: '',
    price: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    } else {
      setData({ title: '', author: '', genre: '', publication_year: '', price: '' });
    }
    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const errs = validateBook(data);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      onSubmit(data);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="my-2">Title</Label>
            <Input name="title" value={data.title} onChange={handleChange} />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div>
            <Label className="my-2">Author</Label>
            <Input name="author" value={data.author} onChange={handleChange} />
            {errors.author && <p className="text-sm text-red-500">{errors.author}</p>}
          </div>

          <div>
            <Label className="my-2">Genre</Label>
            <Input
              name="genre" value={data.genre} onChange={handleChange}/>
            {errors.genre && <p className="text-sm text-red-500">{errors.genre}</p>}
          </div>

          <div>
            <Label className="my-2">Publication Year</Label>
            <DatePicker
              selected={data.publication_year ? new Date(data.publication_year, 0) : null}
              onChange={(date) => {
                const year = date?.getFullYear();
                setData({ ...data, publication_year: year });
              }}
              showYearPicker
              dateFormat="yyyy"
              placeholderText="Select year"
              className="border rounded px-3 py-2"
            />
            {errors.publication_year && <p className="text-sm text-red-500">{errors.publication_year}</p>}
          </div>

          <div>
            <Label className="my-2">Price</Label>
            <Input
              type="number" name="price" value={data.price} onChange={handleChange}/>
            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
          </div>

          <div className="flex justify-end">
            <Button className="cursor-pointer" onClick={handleSubmit}>
              {initialData ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBookModal;