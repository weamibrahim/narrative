"use client"
import { IoSearch } from "react-icons/io5";
import cookies from "js-cookie";
import useSWR from "swr";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
///import RemoveBtn from "../../components/RemoveBtn";
import{ useState } from "react";

const token = cookies.get("token");
const fetcher = (url) => fetch(url
    , {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());

export default function AllUsers() {

  const[search, setSearch] = useState("");
  const { data: users, error , mutate} = useSWR("http://localhost:3000/api/profile", fetcher);

  if (error) return <div>Error loading users</div>;
  if (!users) return <div>Loading...</div>;

console.log(users)
const handleDelete = async (userId) => {
 
  try {
    // Make a DELETE request to your API to delete the user
    await fetch(`http://localhost:3000/api/profile?id=${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    // Trigger a re-fetch after deletion
    mutate();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};


    return (
        <div>
        <div className="flex justify-center  my-4">
          <IoSearch className="text-4xl text-fuchsia-700 mx-2" />
          <input type="text" className=" w-64 h-75 border-fuchsia-700 border-4 rounded-md" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
  
        <div className="flex flex-col md:flex-row md:justify-evenly my-5">
      <button type="button" className="btn-style md:btn-md  focus:outline-none text-white bg-fuchsia-700 hover:bg-fuchsia-900 focus:ring-4 focus:ring-fuchsia-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-fuchsia-900 "><Link href="/Dashboard/users/create">Add user</Link></button>

  </div>
  
       
      <div  className="container mx-auto" >

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >
              <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 " >

                <thead className="text-xs text-white uppercase bg-fuchsia-700 dark:bg-fuchsia-700 dark:text-gray-400">
                  <tr>

                  
                    <th scope="col" className="px-6 py-3">name</th>
                    <th scope="col" className="px-6 py-3">email </th>
                   
                    <th>action</th>
                  </tr>
                </thead>
                {users.filter((item) => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
                                .map((item,index) => (
                    <tbody        >
                      <tr key={item._id} className="my-2"> 

                       
                        <td className="px-6 py-3 ">{item.name}</td>
                        <td className="px-6 py-3 ">{item.email}</td>
                       
                        <td>
                        <button
            type="button"
            onClick={() => handleDelete(item._id)}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-700 dark:text-red-700 dark:hover:text-white dark:hover:bg-red-900 dark:focus:ring-red-900"
          ><MdDelete /></button> 
          
        
          
       
                        </td>
                       
                      </tr>

                    </tbody>
                  ))}
              </table>

    
    

  

  </div>
  </div>
       
      </div>
  
  
  
    )
}