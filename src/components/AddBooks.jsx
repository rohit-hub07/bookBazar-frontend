import React from 'react';
import useBookStore from '../store/useBookStore';
import { useForm } from 'react-hook-form';
import { BookOpen, User, Image, IndianRupee, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
  const { addBook, isBookAdding } = useBookStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    await addBook(data);
    navigate("/")
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <PlusCircle className="text-blue-600" />
        Add a New Book
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1 flex items-center gap-2">
            <BookOpen size={18} />
            Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium mb-1 flex items-center gap-2">
            <User size={18} />
            Author
          </label>
          <input
            {...register('author', { required: 'Author is required' })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1 flex items-center gap-2">
            <Image size={18} />
            Image URL
          </label>
          <input
            {...register('bookImage', { required: 'Image URL is required' })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste image URL"
          />
          {errors.bookImage && <p className="text-red-500 text-sm mt-1">{errors.bookImage.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1 flex items-center gap-2">
            <IndianRupee size={18} />
            Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required' })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isBookAdding}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isBookAdding ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooks;
