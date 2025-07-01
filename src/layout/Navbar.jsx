import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import { LogOut, ShoppingCart } from "lucide-react"; // from lucide-react
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = ({ isLoggedIn }) => {
  const { authUser, checkAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const handleLogout = async() => {
    await logout();
    navigate("/auth/login")
  }
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-700">
        BookBazar
      </Link>

      <div className="flex items-center gap-5">
        {!isLoggedIn ? (
          <>
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition px-3 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-800 font-medium mr-1">
              Welcome,
            </span>
            <Link
              to="/auth/me"
              className="text-blue-700 hover:text-blue-900 font-semibold transition px-3 py-2 rounded-md"
            >
              {authUser?.name}
            </Link>
            {authUser?.role === "admin" ? <Link to="/books" className="relative group">Add Book</Link>: <></>}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 transition px-3 py-2 rounded-md"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </>
        )}

        {/* Cart */}
        <Link to="/orders" className="relative group">
          <span className="text-gray-800 font-medium">
              Orders
            </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
