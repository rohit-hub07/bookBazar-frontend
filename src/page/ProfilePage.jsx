import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import useOrderStore from '../store/useOrderStore';
import { User, BadgeCheck, Book, IndianRupee, PenLine } from 'lucide-react';

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { orders, allOrders } = useOrderStore();

  useEffect(() => {
    allOrders();
  }, [allOrders]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Profile Info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-full">
          <User className="text-blue-600" size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{authUser?.name}</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-green-500" />
            {authUser?.role}
          </p>
        </div>
      </div>

      {/* Orders List */}
      {authUser?.role === "admin" ? <h2 className="text-xl font-semibold mb-4">All Orders</h2>: <h2 className="text-xl font-semibold mb-4">Your Orders</h2>}
      <div className="space-y-4">
        {orders?.map((val, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md p-4 rounded-lg flex items-center gap-6"
          >
            <img
              src={val?.bookDetail?.bookImage}
              alt={val?.bookDetail?.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Book className="w-4 h-4 text-blue-500" />
                {val?.bookDetail?.title}
              </h3>
              <p className="text-gray-700 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                {val?.bookDetail?.price}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <PenLine className="w-4 h-4 text-purple-500" />
                {val?.bookDetail?.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
