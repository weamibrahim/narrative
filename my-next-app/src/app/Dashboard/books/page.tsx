"use client"
import { IoSearch } from "react-icons/io5";
import cookies from "js-cookie";
import useSWR from "swr";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import SideBar from "@/components/SideBar";
import Loading from "@/components/Loading";
///import RemoveBtn from "../../components/RemoveBtn";
import { useState } from "react";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function AllBooks() {

  const [search, setSearch] = useState("");
  const { data: books, error, mutate } = useSWR("/api/books", fetcher);

  if (error) return <div>Error loading books</div>;
  if (!books) return <div><Loading/></div>;

  console.log(books)
  const handleDelete = async (bookId: any) => {
    const token = localStorage.getItem("token");
    try {
      // Make a DELETE request to your API to delete the book
      await fetch(`/api/books?id=${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      // Trigger a re-fetch after deletion
      mutate();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };


  return (

    <div className="flex justify-center">
   
        <SideBar/>

        <main className="flex-1 p-4 overflow-y-auto background">
          <div className="flex justify-center  my-4">
            <IoSearch className="text-4xl text-fuchsia-700 mx-2" />
            <input type="text" className=" w-64 h-75 border-fuchsia-700 border-4 rounded-md" placeholder="SearchByNameOfBook" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="flex justify-center my-5">
          <Link href="/Dashboard/books/create">
            <button
              type="button"
              className="btn-style md:btn-md focus:outline-none text-white bg-fuchsia-700 hover:bg-fuchsia-900 focus:ring-4 focus:ring-fuchsia-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-fuchsia-900"
            >
              Add Book
            </button>
          </Link>

          </div>


          <div className="container mx-auto" >

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >
              <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 " >

                <thead className="text-xs text-white uppercase bg-fuchsia-700 dark:bg-fuchsia-700 dark:text-gray-400">
                  <tr>

                    <th scope="col" className="px-6 py-3 "> Author</th>
                    <th scope="col" className="px-6 py-3">NameOfBook </th>


                    <th>action</th>
                  </tr>
                </thead>
                <tbody        >
                {books.filter((item: any) => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((item: any, index: any) => (
                  
                      <tr key={item._id} className="my-2">

                        <td className="px-6 py-3 text-xl text-white">{item.author}</td>
                        <td className="px-6 py-3 text-xl text-white">{item.name}</td>


                        <td>
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            className=" hover:text-red-700 text-white border border-red-700  hover:border-white bg-red-700  hover:bg-white focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-700 dark:text-red-700 dark:hover:text-white dark:hover:bg-red-900 dark:focus:ring-red-900"
                          ><MdDelete  className="text-2xl"/></button>



<Link href={`/Dashboard/books/update/${item._id}`}>
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:text-blue-700 border border-blue-700 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-700 dark:text-blue-700 dark:hover:text-white dark:hover:bg-blue-900 dark:focus:ring-blue-900"
                          >
                            <FaRegEdit  className="text-2xl"/>
                          </button>
                        </Link>

                        </td>

                      </tr>

                   
                  ))}
                  </tbody>
              </table>






            </div>

</div>
  </main>

    </div>
  
  
  
  
    )
}