// "use client";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function Signuppage() {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [buttonDisabled, setButtonDisabled] = useState(false);
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const onSignup = async () => {
//     try {
//       setLoading(true);
//       // const response = await axios.post("/api/users/signup", user);
//       const response = await fetch("/api/users/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });
//       console.log("Signup success", response);
//       router.push("/login");
//     } catch (error: any) {
//       console.log("Signup failed", error.message);

//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (
//       user.email.length > 0 &&
//       user.username.length > 0 &&
//       user.password.length > 0
//     ) {
//       setButtonDisabled(false);
//     } else {
//       setButtonDisabled(true);
//     }
//   }, [user]);
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1>{loading ? "Processing..." : "Signup"}</h1>
//       <hr />
//       <label htmlFor="username">username</label>
//       <input
//         id="username"
//         className="text-black"
//         value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//         placeholder="Username"
//         type="text"
//       />
//       <label htmlFor="username">email</label>
//       <input
//         id="email"
//         value={user.email}
//         className="text-black"
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//         placeholder="Email"
//         type="text"
//       />
//       <label htmlFor="username">password</label>
//       <input
//         id="password"
//         className="text-black"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//         placeholder="Password"
//         type="password"
//       />
//       <button onClick={onSignup}>
//         {buttonDisabled ? "fill form" : "Signup"}
//       </button>
//       <Link href="/login">Visit login page</Link>
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/profile");
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No login" : "Login"}
      </button>
      <Link href="/signup">Visit signup page</Link>
    </div>
  );
}
