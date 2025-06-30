import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useBookStore from '../store/useBookStore';
import { useForm } from 'react-hook-form';
import {
  Loader2,
  BookOpen,
  User,
  IndianRupee,
  Image,
  FileEdit
} from 'lucide-react';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    book,
    getBookDetails,
    isBookLoading,
    updateBook,
    isBookUpdating
  } = useBookStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    getBookDetails(id);
  }, [id, getBookDetails]);

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        price: book.price,
        bookImage: book.bookImage
      });
    }
  }, [book, reset]);

  const onSubmit = async (data) => {
    await updateBook(id, data);
    navigate(`/books/${id}`); // or any route to go after update
  };

  if (isBookLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileEdit className="text-blue-600" />
        Edit Book Details
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2" >
            <BookOpen className="text-indigo-500" size={18} />
            Title
          </label>
          <input
            {...register('title', { required: true })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
        </div>

        {/* Author Field */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <User className="text-green-600" size={18} />
            Author
          </label>
          <input
            {...register('author', { required: true })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">Author is required</p>}
        </div>

        {/* Price Field */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <IndianRupee className="text-emerald-600" size={18} />
            Price (₹)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: true, min: 0 })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">Valid price is required</p>}
        </div>

        {/* Image Field */}
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-2">
            <Image className="text-orange-500" size={18} />
            Image URL
          </label>
          <input
            {...register('bookImage', { required: true })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
          {errors.bookImage && <p className="text-red-500 text-sm mt-1">Image URL is required</p>}
        </div>

        {/* Preview */}
        <div className="flex justify-center">
          <img
            src={book?.bookImage}
            alt={book?.title}
            className="w-28 h-36 object-cover rounded shadow-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isBookUpdating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2 transition"
        >
          {isBookUpdating && <Loader2 className="animate-spin w-5 h-5" />}
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
