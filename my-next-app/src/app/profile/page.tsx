"use client"

import Link from "next/link";

import "../globals.css";

export default function Profile() {
  const user = localStorage.getItem("user") || "{}"; // Ensure a default empty object if 'user' is not present
  const profile = JSON.parse(user);


  return (
    <div className="backgroundProfile">
      <div className="mx-auto w-100 p-10 rounded-tr-lg ">
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-photo/handsome-young-man-reading-magazine-standing-front-book-shelf_23-2147936796.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=ais"
            className="rounded-full w-40 h-40"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold my-5">User Profile</h1>
          <ul className="flex flex-col items-center space-y-4 italic">
            <li className="my-2"><span className="font-bold">Name:</span> {profile.name}</li>
            <li className="my-2"><span className="font-bold">Email:</span> {profile.email}</li>
            <li className="my-2"><span className="font-bold">Address:</span> {profile.address}</li>
            <li className="my-2"><span className="font-bold">Phone:</span> {profile.phone}</li>
            {/* Add more fields as needed */}
          </ul>
          <button className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded my-7">
            <Link href={`/updateProfile/${profile._id}`}>Update</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
