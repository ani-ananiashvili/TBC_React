"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-5 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold underline mb-5">
          User Profile
        </h1>
        <img
          src={user.picture}
          alt={user.name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md mb-5"
        />
        <h2 className="text-xl md:text-2xl font-medium mb-2">{user.name}</h2>
        <p className="text-sm">{user.email}</p>
      </div>
    )
  );
}
