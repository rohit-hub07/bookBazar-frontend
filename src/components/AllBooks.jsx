import React, { useEffect } from "react";
import useBookStore from "../store/useBookStore";
import { Link } from "react-router-dom";


const AllBooks = () => {
  const { books, getAllBooks } = useBookStore();

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">All Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={book.bookImage || "https://th.bing.com/th/id/OIP.4fZvK8IfIRSr_aHUa_tSiAHaKl?w=208&h=297&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{book.title}</h3>
              <p className="text-gray-600 mb-1 font-medium">₹{book.price}</p>

              <Link to={`/books/${book._id}`}>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
