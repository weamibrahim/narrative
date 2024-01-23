
"use client"
import { useRouter } from "next/navigation";
export default function RemoveBtn({id}:any) {
console.log(id)
    const router = useRouter()
    const deleteBook = async () => {
   
        const res = await fetch(`http://localhost:3000/api/books?id=${id}`, {
        method: "DELETE",
      })
     if(res.ok){
      router.refresh()
    
      
    }
    }
    return (
        <div>
            <button className="text-fuchsia-700 hover:text-white border border-fuchsia-700 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-fuchsia-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-fuchsia-700 dark:text-fuchsia-700 dark:hover:text-white dark:hover:bg-fuchsia-900 dark:focus:ring-fuchsia-900" onClick={deleteBook}>
                {/* <HiOutlineTrash/> */}
               DELETE
            </button>
        </div>
    )
    
}
