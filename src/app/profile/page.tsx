"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
      console.log("logout successfully");
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/aboutme");
    console.log(res.data);
    console.log("get user data");

    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-600">
      <h1 className="text-3xl font-bold underline">PROFILE</h1>

      <h2 className="text-lg rounded-xl bg-purple-600 p-3 mt-5">
        {data === "nothing" ? (
          "NOTHING"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <div className="flex gap-5">
        <button
          onClick={getUserDetails}
          className="bg-teal-500 mt-4 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        >
          GetUser Details
        </button>
        <button
          onClick={logout}
          className="bg-red-600 mt-4 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
