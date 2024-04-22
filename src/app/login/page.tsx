"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Loginpage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response) {
        router.push("/profile");
      } else {
        throw new Error("Login failed");
      }
      // const response = await fetch("/api/users/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(user),
      // })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error: any) {
      //     console.log("api error", error);
      //   });
      console.log("Login success", response);
    } catch (error: any) {
      console.log("Login failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-600">
      <div className=" border border-blue-50 flex flex-col bg-slate-300 h-full p-5 rounded-lg">
        <h1 className="text-3xl font-bold text-purple-700 text-center">
          {loading ? "Processing..." : "Login"}
        </h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-xl text-purple-600">
            Email
          </label>
          <input
            id="email"
            value={user.email}
            className="text-black rounded-lg pl-3 h-8 my-2"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            type="text"
          />
          <label htmlFor="password" className="text-xl text-purple-600">
            Password
          </label>
          <input
            id="password"
            className="text-black rounded-lg pl-3 h-8 my-2"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="text-center">
          {buttonDisabled ? (
            <button className="text-white border border-black rounded-xl cursor-not-allowed bg-purple-600 hover:bg-white hover:text-purple-500 font-medium text-lg w-[8rem]">
              Login
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="text-white border border-black rounded-xl bg-purple-600 hover:bg-white hover:text-purple-500 font-medium text-lg w-[8rem]"
            >
              Login
            </button>
          )}
        </div>
        <Link
          href="/signup"
          className="text-md font-medium mt-3 text-purple-950"
        >
          Visit signup page
        </Link>
      </div>
    </div>
  );
}
