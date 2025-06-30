import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const useBookStore = create((set) => ({
  books: [],
  isBooksLoading: false,
  book: null,
  isBookLoading: FinalizationRegistry,
  newBook: null,
  isBookAdding: false,
  isBookUpdating: false,
  getAllBooks: async () => {
    set({ isBooksLoading: true });
    try {
      const res = await axiosInstance.get("/books");
      console.log("Books inside of useBookStore: ", res);
      set({ books: res.data.allBooks });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error fetching books", error);
      toast.error("Error fetching books");
    } finally {
      set({ isBooksLoading: false });
    }
  },

  getBookDetails: async (id) => {
    set({ isBookLoading: true });
    try {
      const res = await axiosInstance.get(`/books/${id}`);
      set({ book: res.data.bookDetail });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error fetching book details!");
    } finally {
      set({ isBookLoading: false });
    }
  },

  addBook: async (data) => {
    set({ isBookAdding: true });
    try {
      const res = await axiosInstance.post("/books", data);
      set({ newBook: res.data.addedBook });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error adding book!");
    } finally {
      set({ isBookAdding: false });
    }
  },

  updateBook: async (id, data) => {
    set({ isBookUpdating: true });
    try {
      const res = await axiosInstance.put(`/books/update/${id}`, data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error updating books!");
    } finally {
      set({ isBookUpdating: false });
    }
  },
  deleteBook: async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      toast.success("Book Deleted successfully");
    } catch (error) {
      toast.error("Error deleting book!");
    }
  },
}));

export default useBookStore;
