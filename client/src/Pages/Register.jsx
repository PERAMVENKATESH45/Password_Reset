import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import { MdEmail } from "react-icons/md";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = { name, email, password };
      const response = await axios.post(
        "https://password-reset-eha6.onrender.com/api/auth/register",
        payload
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <div className="card text-light rounded-4 pb-4 ">
      <h3 className="text-center pt-4 pb-3 shadow-lg fw-bolder text-capitalize ">Create Account</h3>
      <form onSubmit={handleSubmit} className="text-black ">
        <div className="form-floating m-md-4 d-flex m-2 mb-4 position-relative align-items-center justify-items-center">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            className="form-control px-10"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Full Name</label>
          <FaUser size={"23px"} className="border-0 bg-transparent position-absolute end-0 me-3 text-primary"/>
        </div>

        <div className="form-floating m-md-4 d-flex m-2 mb-4 position-relative align-items-center justify-items-center">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <MdEmail size={"25px"} className="border-0 bg-transparent position-absolute end-0 me-3 text-primary"/>
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
            {showPassword ? <FaEyeSlash size={"25px"}/> : <FaEye size={"25px"}/>}
          </button>
        </div>

        <button type="submit" className="btn btn-primary text-light border-0 rounded-3 shadow-lg fw-bold px-4 py-2">Register</button>
      </form>

      <div className="mt-3">
        Already have an account? <Link to={"/login"} className="fw-bolder">Login</Link>
      </div>
    </div>
  );
};

export default Register;
