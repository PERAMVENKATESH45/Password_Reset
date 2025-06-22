import axios from "axios";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = { email, password };
      const response = await axios.post(
        "https://password-reset-eha6.onrender.com/api/auth/login",
        payload
      );
      toast.success(response.data.message);
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="card text-light rounded-4 pb-4">
      <h3 className="text-center pt-3 shadow-lg fw-bolder text-capitalize">Log In</h3>
      <form onSubmit={handleSubmit} className="text-black ">
        <div className="form-floating m-md-4 d-flex m-2 mb-4 position-relative align-items-center justify-items-center">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="form-control px-10"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <MdEmail
            size={"25px"}
            className="border-0 bg-transparent position-absolute end-0 me-3 text-primary"
          />
        </div>

        <div className="form-floating d-flex m-md-4 m-2 mb-4 position-relative align-items-center justify-items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>

          <button
            type="button"
            className="border-0 bg-transparent position-absolute end-0 me-2 text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={"25px"} /> : <FaEye size={"25px"} />}
          </button>
        </div>
        <div className="text-end me-4">
          <Link to={"/forgot-password"}>Forgot Password</Link>
        </div>
        <button type="submit" className="btn btn-primary text-light border-0 rounded-3 shadow-lg fw-bold px-4 py-2 mt-3">Login</button>
      </form>

      <div className="mt-3">
        Don't Have an Account? <Link to={"/"} className="fw-bolder">Register</Link>
      </div>
    </div>
  );
};

export default Login;
