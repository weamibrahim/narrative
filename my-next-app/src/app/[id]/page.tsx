"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../globals.css";
import Loading from "@/components/Loading";
export default function Book({ params}: { params: { id: string } }) {
  const [book, setBook] = useState<any>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      const token = Cookies.get("token"); 

      if (!token) {
        router.push("/login"); 
      }

      const { id } = params;
      const res = await fetch(`/api/books/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBook(data.data);
      setIsLoading(false);
    };

    fetchBook();
  }, [params.id, router]);

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <div className=" backgroundImage">
     
      <div className="text-center w-1/2 mx-auto">
        <p className="text-3xl p-8">{book.name}</p>
        <p className="my-3 border-8 border-gray-200 border-x-gray-500 p-12">
          {book.body}
        </p>
        <div className="text-center ">
          <button className= " my-5 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/">Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
