import { axiosInstance } from "../../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

const useOrderStore = create((set) => ({
  order: null,
  isPlacing: false,
  orders: [],
  isAllOrdersLoading: false,
  orderInfo: null,
  placeOrder: async (data,id) => {
    set({ isPlacing: true });
    try {
      const res = await axiosInstance.post(`/orders/${id}`,data);
      set({ order: res.data.order });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error Placing order!", error);
      toast.error("Error placing order!");
    } finally {
      set({ isPlacing: false });
    }
  },

  allOrders: async () => {
    set({ isAllOrdersLoading: true });
    try {
      const res = await axiosInstance.get("/orders");
      set({ orders: res.data.allOrders });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting all orders: ", error);
      toast.error("Error getting all orders!");
    } finally {
      set({ isAllOrdersLoading: false });
    }
  },
  getOrderDetail: async (id) => {
    try {
      const res = await axiosInstance.get(`/orders/orderDetail/${id}`);
      console.log("Order details inside useorderStore: ", res.data)
      set({ orderInfo: res.data.orderDetails });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting order details:", error);
      toast.error("Error getting order details!");
    }
  },

}));

export default useOrderStore;
