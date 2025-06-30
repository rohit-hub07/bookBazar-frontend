import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const useReviewStore = create((set) => ({
  review: null,
  isReviewLoading: false,
  reviews: [],
  isReviewsLoading: false,
  isReviewCreator: false,
  addReview: async (id, data) => {
    set({ isReviewLoading: true });
    try {
      const res = await axiosInstance.post(`/books/${id}/reviews`, data);
      set({ review: res.data.review });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error adding review", error);
      toast.error("Error addign review!");
    } finally {
      set({ isReviewLoading: false });
    }
  },

  getAllReviews: async (id) => {
    set({ isReviewsLoading: true });
    try {
      const res = await axiosInstance.get(`/reviews/${id}/reviews`);
      set({ reviews: res.data.allReview });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting reviews", error);
      toast.error("Error getting reviews!");
    } finally {
      set({ isReviewsLoading: false });
    }
  },
  deleteReview: async (id) => {
    try {
      const res = await axiosInstance.delete(`/reviews/${id}`);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error deleting review!", error);
      toast.error("Error deleting review!");
    }
  },
}));

export default useReviewStore;
