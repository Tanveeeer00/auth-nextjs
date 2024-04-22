"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  // const router = useRouter()
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  });

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  // const {query}=router
  // const urlTokenTwo = query.token

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-600">
      <h1 className="text-4xl mb-5">Verify Email</h1>
      <h2 className="p-2 bg-purple-700 text-white">
        {token ? `${token}` : "no token"}
      </h2>
      <div className="flex justify-center gap-5 mt-5">
        <h2 className="text-2xl bg-slate-700 border border-white/45 shadow-sm shadow-white rounded-xl p-2">
          Your Email Verified
        </h2>
        <div className="text-center border border-white p-2 rounded-xl w-[5rem] bg-purple-700 text-white hover:bg-white hover:text-purple-700">
          <Link href="/login" className="text-xl">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
