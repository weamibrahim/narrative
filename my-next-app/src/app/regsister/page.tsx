"use client"

import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Register() {

    const [users, setUsers] = useState({ name: "", email: "", password: "", address:"",phone:"" })
    const router = useRouter();

    const handleInputChange = (event: any) => {
        
        const { name, value } = event.target;
        setUsers({ ...users, [name]: value })

    }
    const handleSubmit = async (event: any) => {

        event.preventDefault();
        const response = await fetch("/api/regsister", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(users),
        })
        if (response.ok) {
           // console.log("data", users)
            router.push("/login")
        }
    }
    return (
        
        <div className="shadow-2xl shadow-gray-700 w-full p-10">
        <h1 className="text-3xl text-center font-bold mb-5">signup</h1>
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="name" id="name" value={users.name} onChange={handleInputChange} />
            </div>
            <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
           
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" id="email" value={users.email} onChange={handleInputChange} />
            </div>
            <div className="mb-5">
            <label htmlFor="password"className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" name="password" id="password" value={users.password} onChange={handleInputChange} />
            </div>
            <div className="mb-5">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="address" id=" address" value={users.address} onChange={handleInputChange} />
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="phone" id="phone" value={users.phone} onChange={handleInputChange} />
                </div>
            <div className="flex justify-center">
            
            <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">regsister
            </button>
       </div>
        </form>
        </div>
       
   
    )

}