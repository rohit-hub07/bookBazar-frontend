import React, { useEffect } from 'react';
import useOrderStore from '../store/useOrderStore';
import { useParams } from 'react-router-dom';
import {
  IndianRupee,
  ShoppingBag,
  Hash,
  BookOpen,
  PackageCheck
} from 'lucide-react';

const OrderDetailPage = () => {
  const { orderInfo, getOrderDetail } = useOrderStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) getOrderDetail(id);
  }, [id, getOrderDetail]);

  if (!orderInfo || !orderInfo.bookDetail) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading order details...
      </div>
    );
  }

  const { bookDetail, quantity } = orderInfo;

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg space-y-5 border border-gray-200">
      <div className="w-full h-64 overflow-hidden rounded-xl">
        <img
          src={bookDetail.bookImage}
          alt={bookDetail.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <BookOpen className="text-blue-600" size={24} />
          {bookDetail.title}
        </h1>

        <p className="flex items-center text-lg text-gray-700 font-medium">
          <IndianRupee className="text-green-600 mr-2" size={20} />
          {bookDetail.price}
        </p>

        <p className="flex items-center text-base text-gray-600">
          <ShoppingBag className="text-purple-600 mr-2" size={20} />
          Quantity: {quantity}
        </p>

        <p className="flex items-center text-sm text-gray-500">
          <Hash className="mr-1" size={18} />
          Order ID: <span className="ml-1">{orderInfo._id}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetailPage;
