"use client";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default async function Book({ params}: { params: { id: string } }) {
    const token = cookies.get("token");
    const router = useRouter();
    if (!token) {
        router.push("/login"); // Replace "/login" with the actual login page URL
        return null; // Stop further execution of the component
      }
    const { id } = params;
    const res = await fetch(`/api/books/${id}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      })
    
    ;
     const data = await res.json();
     
    const book = data.data
    console.log(book)
    return (
        <div className="grid md:grid-cols-2   my-4">
            <img className="mx-auto rounded-md my-10" src="https://img.freepik.com/free-photo/3d-render-books-fly-fall-blue-background_107791-17215.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=ais" alt="..." />
        <div className="text-center ">
            <p className="text-3xl">Book {book.name}</p>
            
            <p className="my-3 border-8 border-gray-200 border-x-gray-500">Body {book.body}</p>
        </div>
        </div>
    );
}