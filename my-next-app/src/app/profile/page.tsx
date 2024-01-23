"use client"

import Link from "next/link";
import cookies from "js-cookie";
export default function Profile() {
  const user = cookies.get("user"); // Ensure a default empty object if 'user' is not present
  const profile = JSON.parse(user);

  return (
    <div className="mx-auto w-80 p-10   rounded-tr-lg shadow-2xl md:shadow-fuchsia-500  my-8">
      <div className="flex justify-center"><img src="https://img.freepik.com/free-photo/handsome-young-man-reading-magazine-standing-front-book-shelf_23-2147936796.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=ais" className="rounded-full w-40 h-40 " /></div>
      <div className="text-center" >
      <h1 className="text-3xl font-bold my-5">User Profile</h1>
      <ul className="italic">
        <li className="my-2">Name: {profile.name}</li>
        <li className="my-2">Email: {profile.email}</li>
        <li className="my-2">address: {profile.address}</li>
        <li className="my-2">phone: {profile.phone}</li>
        {/* Add more fields as needed */}
      </ul>
      <button className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded my-7" >
        <Link href={`/updateProfile/${profile._id}`}>update</Link>
      </button>
      </div>
    </div>
  );
}
