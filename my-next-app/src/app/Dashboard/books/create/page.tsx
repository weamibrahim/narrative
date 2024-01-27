
"use client"

import {  useState } from "react";

import cookies from "js-cookie";
import { useRouter} from "next/navigation";

export default   function create(){
  const token = cookies.get("token");
  console.log("token",token)
const [books , setBooks] = useState({
  author: "",
  name: "",
  body: "",
});
const router = useRouter()
 const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setBooks({ ...books, [name]: value });
 }
 
 const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(books),
    });
    if (response.ok) {
      router.push("/Dashboard/books");
    }
 };
 return (
  <div className="shadow-2xl shadow-gray-700 w-full p-10">
        <h1 className="text-3xl text-center font-bold mb-5">create book</h1>
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input type="text" name="name" value={books.name} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
 </div>

 
  <br />
  <div className="mb-5">
  <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">author</label>
    <input type="text" name="author" value={books.author} onChange={handleInputChange} 
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
  <br />
  <div className="mb-5">
  <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">boody</label>
    <input type="text" name="body" value={books.body} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  </div>
  <br />
  <div className="flex justify-center">
            
            <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">create
            </button>
       </div>
    </form>
</div>


 )
    
}