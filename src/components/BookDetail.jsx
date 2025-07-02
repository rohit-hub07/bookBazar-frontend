import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useBookStore from "../store/useBookStore";
import { ShoppingBag } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const BookDetail = () => {
  const { id } = useParams();
  const { book, getBookDetails,deleteBook } = useBookStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getBookDetails(id);
  }, [id, getBookDetails]);

  let isAdmin = false;
  const checking = () => {
    if(authUser?.role === "admin"){
      isAdmin = true;
      return true;
    };
    if (!authUser?._id || !book?.purchasedBy) return false;
    return book.purchasedBy.some((user) => user._id?.toString() === authUser._id.toString());
  };

  const isMatched = checking();
  

  const defaultCover =
    "https://th.bing.com/th/id/OIP.4fZvK8IfIRSr_aHUa_tSiAHaKl?w=208&h=297&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";

  const deleteFunction = async(id) => {
    await deleteBook(id);
    navigate("/");
  }

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden lg:flex lg:items-center">

        <div className="lg:flex-shrink-0 w-full lg:w-2/5 relative">
          <img
            src={book?.bookImage || defaultCover}
            alt={book?.title || "Book cover"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultCover;
            }}
            className="w-full h-auto max-h-[500px] object-cover rounded-t-xl lg:rounded-l-xl"
          />
        </div>

       
        <div className="p-6 lg:w-3/5 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl lg:text-5xl font-semibold text-blue-700 mb-2">
              {book?.title || "Untitled"}
            </h2>
            <h3 className="text-2xl text-gray-800 italic mb-4">
              by {book?.author || "Unknown Author"}
            </h3>
            <p className="text-xl font-medium text-gray-900 mb-6">
              Price:{" "}
              <span className="text-blue-600">{book?.price || "N/A"}</span>
            </p>
          </div>

          
          <Link to={`/orders/${book?._id}`}>
            <button
              aria-label={`Add ${book?.title} to cart`}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition font-semibold shadow-md"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              <span>Place Order</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-end mt-6 gap-4">
        {isAdmin ? (
          <>
            <Link to={`/books/update/${book?._id}`}>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition font-medium">
                Update Book Details
              </button>
            </Link>
            
              <button onClick={() => deleteFunction(book?._id)} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition font-medium">
                Delete Book
              </button>
            
          </>
        ): (<></>)}
        {isMatched ? (
          <>
            <Link to={`/books/${book?._id}/reviews`}>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition font-medium">
                Add Review
              </button>
            </Link>
          </>
        ) : (
          <></>
        )}

        <Link to={`/reviews/${book?._id}/reviews`}>
          <button className="px-4 py-2 bg-gray-200 text-green-700 rounded-lg shadow hover:bg-green-100 border border-green-600 transition font-medium">
            See All Reviews
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookDetail;
