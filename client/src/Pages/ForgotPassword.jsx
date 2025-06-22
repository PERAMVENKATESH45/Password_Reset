import axios from "axios";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://password-reset-eha6.onrender.com/api/auth/forgot-password/",
        { email }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An error occurred, please try again."
      );
    }
  };

  return (
    <div className="forgot-page-card card text-light rounded-4 pb-4 ">
      <h3 className="text-center pt-3 shadow-lg fw-bolder text-capitalize">
        Verify Email
      </h3>
      <form onSubmit={handleSubmit}  className="text-black ">
        <div className="form-floating m-md-4 d-flex m-2 mb-4 position-relative align-items-center justify-items-center">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
             className="form-control px-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <MdEmail
            size={"25px"}
            className="border-0 bg-transparent position-absolute end-0 me-3 text-primary"
          />
        </div>
        <button type="submit" className="btn btn-primary text-light border-0 rounded-3 shadow-lg fw-bold px-4 py-2 mt-3">Send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
