import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import AllBooks from "../components/AllBooks";

const HomePage = () => {

  return (
    <>
      <AllBooks />
    </>
  );
};

export default HomePage;
