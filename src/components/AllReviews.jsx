import React, { useEffect } from "react";
import useReviewStore from "../store/useReviewStore";
import { useParams } from "react-router-dom";
import { Star, User, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const AllReviews = () => {
  const {
    reviews,
    getAllReviews,
    isReviewsLoading,
    deleteReview,
  } = useReviewStore();
  const { authUser } = useAuthStore();
  const { id } = useParams();
  useEffect(() => {
    if (id) getAllReviews(id);
  }, [id, getAllReviews]);

  const deleteFunction = async(idd) => {
    await deleteReview(idd);
    await getAllReviews(id)
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
        All Reviews
      </h1>

      {isReviewsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin w-12 h-12 text-blue-500" />
        </div>
      ) : reviews?.length > 0 ? (
        reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="text-blue-500" size={20} />
                <span className="font-medium text-gray-700">
                  {review.user?.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center text-yellow-500">
                  <Star size={18} />
                  <span className="ml-1 font-semibold">{review.rating}/10</span>
                </div>
                {/* Delete Icon */}
                {authUser?.role === "admin" || authUser?._id == review?.user?._id ? (
                  <>
                    <button
                      onClick={() => deleteFunction(review._id)}
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      title="Delete review"
                    >
                      {/* Changed to Trash icon from lucide-react */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <p className="text-gray-600">{review.description}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default AllReviews;
