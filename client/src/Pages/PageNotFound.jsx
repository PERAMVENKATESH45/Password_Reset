import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = ({ setIsNotFoundPage }) => {
  useEffect(() => {
    setIsNotFoundPage(true);
    return () => setIsNotFoundPage(false);
  }, [setIsNotFoundPage]);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 flex-column">
        <h4 className="text-primary fw-bolder fs-2">404 Page Not Found</h4>
      <div className="">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe88HagbqedZreTJZPi9rLdcnEL9DkhtiwqQ&s"
          alt="Page Not Found"
          width={"300px"}
          height={"300px"}
        />
      </div>
      <Link to={"/login"}  type="submit" className="btn btn-primary text-light border-0 rounded-3 shadow-lg fw-bold px-4 py-2 mt-3">  Go To Login Page </Link>
    </div>
  );
};

export default PageNotFound;
