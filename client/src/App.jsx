import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "./index.css";
import PageNotFound from "./Pages/PageNotFound";

const App = () => {
  const [token, setToken] = useState("");
  const [isNotFoundPage, setIsNotFoundPage] = useState(false)


  return (
    <div className={`${isNotFoundPage ? "" : "app-container"} d-flex align-items-center justify-content-center`}>
      <div>
        <ToastContainer />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="*" element={<PageNotFound setIsNotFoundPage={ setIsNotFoundPage }/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
