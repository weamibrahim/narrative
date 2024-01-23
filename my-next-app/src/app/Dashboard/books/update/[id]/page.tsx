"use client";
import cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Update({ params }: { params: { id: string } }) {
  const { id } = params;
  const token = cookies.get("token");
  
  console.log("token", token);
  const [book, setBook] = useState({
    author: "",
    name: "",
    body: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/books/${id}`,{
      method:'GET',
      
    })
      .then((res) => res.json())
      .then((data) => {
        const bookData = data.data;
        setBook(bookData);
      });
  }, [id]);

  const router = useRouter();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Update on the client side
    // ...

    // Send update to the server
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(book),
    });

    console.log(response);
    if (response.ok) {
      // Handle success (e.g., redirect)
      
    router.push('/Dashboard/books');
    } else {
      // Handle error
      console.error('Update failed');
    }
  };

  return (
    <div className="shadow-2xl shadow-gray-700 w-full p-10">
        <h1 className="text-3xl text-center font-bold mb-5">update book</h1>
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="author" className="block font-bold mb-2">Author</label>
      <input
        type="text"
        name="author"
        value={book.author || ""}
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      </div>
      <div className="mb-5">
      <label htmlFor="name" className="block font-bold mb-2">Name</label>
      <input
        type="text"
        name="name"
        value={book.name || ""}
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      </div>
      <div className="mb-5">
      <label htmlFor="body" className="block font-bold mb-2">Body</label>
      <input
        type="text"
        name="body"
        value={book.body || ""}
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      </div>
      <div className="flex justify-center">
            
            <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">update
            </button>
       </div>
    </form>
    </div>
  );
}
