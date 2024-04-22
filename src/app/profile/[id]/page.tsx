import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="mb-3 text-3xl">Profile</h1>
        <hr />
        <p className="text-2xl">
          User Id
          <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
            {params.id}
          </span>
        </p>
      </div>
    </div>
  );
}
