import React from "react";
import Link from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-85"
        >
          SIGN UP
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Have An Account
          <Link to={"/sign-in"}>
            <span className="text-blue-500">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
