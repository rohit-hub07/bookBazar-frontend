import { axiosInstance } from "../../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isCheckingAuth: false,
  userLoggedIn: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/me");
      console.log("Response data of checkAuth: ", res.data);

      set({ authUser: res.data.currUser,userLoggedIn: true });
    } catch (error) {
      console.log("Error checking auth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      console.log("Response data of signup: ", res.data);
      set({ authUser: res.data.newUser,userLoggedIn: true });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error signing up: ", error);
      toast.error("Error signing up");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log("Login data: ", res.data);
      set({ authUser: res.data.user,userLoggedIn: true });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error logging user: ", error);
      toast.error("Error logging user");
    } finally {
      set({ isLogging: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.get("/auth/logout");
      set({ authUser: null,userLoggedIn:false });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in logout: ", error);
      toast.error("Error while logging out!");
    }
  },
}));
