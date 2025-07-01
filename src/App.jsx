import { useEffect, useState } from "react";
import "./App.css";
import { useAuthStore } from "./store/useAuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import SignupPage from "./page/SignupPage";
import BookDetail from "./components/BookDetail";
import PlaceOrder from "./components/PlaceOrder";
import OrderPage from "./page/OrderPage";
import OrderDetailPage from "./page/OrderDetailPage";
import BookDetailPage from "./page/BookDetailPage";
import AllReviews from "./components/AllReviews";
import ProfilePage from "./page/ProfilePage";
import AddBooks from "./components/AddBooks";
import UpdateBook from "./components/UpdateBook";

function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/auth/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/auth/login"} />}
          />

          <Route path="/books/:id" element={<BookDetail />} />

          <Route
            path="/orders/:id"
            element={<PlaceOrder /> }
          />

          <Route path="/orders" element={<OrderPage />} />

          <Route path="/orders/orderDetail/:id" element={<OrderDetailPage />} />

          <Route path="/books/:id/reviews" element={<BookDetailPage />} />

          <Route path="/reviews/:id/reviews" element={<AllReviews />} />

          <Route path="/auth/me" element={<ProfilePage />} />

          <Route path="/books" element={<AddBooks />} />
          <Route path="/books/update/:id" element={<UpdateBook />} />
        </Route>

        <Route
          path="/auth/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
