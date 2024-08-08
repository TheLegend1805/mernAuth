import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signInStart()); // Set loading to true
      const res = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Check if the response is not OK
        dispatch(signInFailure(data.message || "Login failed!")); // Dispatch the error message
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message || "Something went wrong")); // Use error.message
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-red-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-85"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          New User?
          <Link to={"/sign-up"}>
            <span className="text-blue-500"> Sign Up</span>
          </Link>
        </p>
      </div>

      {error && ( // Conditional rendering for error message
        <p className="text-red-600 mt-5">{error}</p>
      )}
    </div>
  );
};

export default SignIn;
