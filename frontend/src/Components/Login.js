import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "./LoginValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [emailErrors,setEmailErrors]=useState();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:4004/login", values)
        .then((res) => {
          console.log(res.data)
          navigate('/home');
        })
        .catch((err) => setEmailErrors(err.response.data.error));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-30">
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
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
            {emailErrors && (
              <span className="text-danger">{emailErrors}</span>
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
             <div>
            {emailErrors && (
              <span className="text-danger">{emailErrors}</span>
            )}
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <p>You are agree to aour terms and policies</p>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;








// axios.post('http://localhost:4004/login',values)
// .then(res=>{
//     console.log(res.data);
//     if(res.data){
//         navigate('/home');
//     }else{
//         alert("No record Existed");
//     }
// }).catch(err=>console.log(err))





// else {
//     // Login failed, show error message
//     alert("Invalid email or password");
//   }