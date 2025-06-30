import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useOrderStore from "../store/useOrderStore";
import { ShoppingCart, PlusCircle, MinusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookDetail from "./BookDetail";

const schema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export default function PlaceOrder() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const { placeOrder, isPlacing } = useOrderStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1 },
  });

  const quantity = watch("quantity");

  const onSubmit = async (data) => {
    if (!bookId) {
      return alert("Missing book ID");
    }
    // assuming backend needs { id, quantity }
    await placeOrder({ id: bookId, quantity: data.quantity }, bookId);
    navigate("/");
  };

  return (
    <>
      <BookDetail />
      <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
        <h1 className="flex items-center justify-center text-2xl font-bold mb-6">
          <ShoppingCart className="mr-2" size={28} />
          Place Order
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center space-x-2">
            <MinusCircle
              size={24}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setValue("quantity", Math.max(1, quantity - 1))}
            />
            <input
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              className={`w-20 text-center px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.quantity
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            <PlusCircle
              size={24}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setValue("quantity", quantity + 1)}
            />
          </div>
          {errors.quantity && (
            <p className="text-sm text-red-600">{errors.quantity.message}</p>
          )}
          <button
            type="submit"
            disabled={isPlacing}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md disabled:opacity-50"
          >
            {isPlacing ? (
              <>
                <ShoppingCart className="animate-spin mr-2" size={20} />
                Placing...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2" size={20} />
                Proceed To checkout
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
