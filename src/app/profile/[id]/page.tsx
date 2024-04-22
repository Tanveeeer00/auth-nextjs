import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-600">
      <p className="text-2xl">
        User Id
        <span className=" p-2 ml-2 rounded-xl bg-purple-600 text-white">
          {params.id}
        </span>
      </p>
    </div>
  );
}
