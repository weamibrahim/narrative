"use client"

import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const UpdateProfilePage = () => {
    const dataOfUser = localStorage.getItem("user");; // Ensure a default empty object if 'user' is not present
    const token = localStorage.getItem("token");
    const profile = JSON.parse(dataOfUser || "{}");
    const [user, setUser] = useState({
        name: profile.name,
        email: profile.email,
        _id: profile._id,
        address: profile.address,
        phone: profile.phone
    });

  

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    const handleUpdateProfile = async (e: any) => {
      
        e.preventDefault();
        const response = await fetch(`/api/profile/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });

        console.log(user);

        if (response.ok) {
            const updateprofile = { ...user };
           localStorage.setItem('user', JSON.stringify(updateprofile));
           
            console.log('Profile updated successfully');
            

           
        } else {
            console.error('Profile update failed');
        }
    }

    return (
      <div className="backgroundProfile">
               <div className="shadow-2xl shadow-gray-700 w-full p-10">
        <h1 className="text-3xl text-center font-bold mb-5">update profile</h1>
    <form onSubmit={handleUpdateProfile}className="max-w-sm mx-auto">
        <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name || ''}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                <br />
                <div className="mb-5">
               <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email || ''}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>

                <br />
                <div className="mb-5">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={user.address || ''}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    </div>
                <br />
                <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={user.phone || ''}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    </div>

                <div className="flex justify-center">
            
            <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><FaRegEdit className="text-2xl"/>
            </button>
       </div>
            </form>
        </div>
        </div>
    )
}

export default UpdateProfilePage;
