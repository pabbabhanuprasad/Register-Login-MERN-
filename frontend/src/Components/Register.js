import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "./RegisterValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [emailError,setEmailError]=useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:4004/register", values)
        .then((res) => {
          navigate('/');
        console.log(res);
        })
        .catch((err) => setEmailError(err.response.data.error));
    }
  };
  console.log(emailError)

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-30">
        <h2>Register</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>User Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleInput}
              className="form-control rounded-0"
            ></input>
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            ></input>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
            <div>
            {emailError && (
              <span className="text-danger">{emailError.email}</span>
            )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            ></input>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button
            type="button"
            className="btn btn-success w-100 rounded-0"
            onClick={handleSubmit}
          >
            Register
          </button>
          <p>Already Have an Anccount</p>
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
