
"use client"
import { IoSearch } from "react-icons/io5";
import cookies from "js-cookie";
import useSWR from "swr";
import Link from "next/link";
import { Carousel } from 'flowbite-react';
import{ useState } from "react";


const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {

  const[search, setSearch] = useState("");
  const { data: books, error , mutate} = useSWR("/api/books", fetcher);

  if (error) return <div>Error loading books</div>;
  if (!books) return <div className="flex justify-center my-40 gap-x-2">
    
    <div role="status">
  <svg aria-hidden="true" className=" w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-fuchsia-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  
</div>
<div role="status">
  <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-fuchsia-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  
</div>
<div role="status">
  <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-fuchsia-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  
</div>

</div>;

console.log(books)


    return (
        <div>
          
         <div className="h-64 sm:h-64 xl:h-80 2xl:h-96 ">
      <Carousel>
      
        <img  src="https://img.freepik.com/free-photo/dad-daughter-together-home_144627-39796.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt="..." />
        <img src="https://img.freepik.com/free-photo/modern-bookstore-showcasing-rows-vibrant-books_60438-3565.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt="..." />
        <img src="https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5916.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt="..." />
        <img src="https://img.freepik.com/free-photo/books-assortment-with-white-background_23-2148898300.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt="..." />
        <img src="https://img.freepik.com/free-photo/open-flying-old-books_1232-2096.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt="..." />
      </Carousel>
    </div>    




{/* 
    <div className='grid  md:grid-cols-2 gap-4 my-5 container mx-auto'>
      <div >
      <img src="https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007415.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt="..." />
      </div>
      <div className='grid grid-rows-2 gap-2' >
     <div className='h-64' ><img className='h-full w-full' src="https://img.freepik.com/free-photo/front-view-stacked-books-earth-globe-open-book-pencils-education-day_23-2149241018.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt="..." /></div>
     <div className='h-64'> <img className='h-full w-full' src="https://img.freepik.com/free-photo/front-view-composition-with-different-books_23-2148851048.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt="..." /></div>
      </div>

    </div> */}









        <div className="flex justify-center  my-4">
          <IoSearch className="text-4xl text-fuchsia-700 mx-2" />
          <input type="text" className=" w-64 h-75 border-fuchsia-700 border-4 rounded-md" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
  
       
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3  gap-x-4 gap-y-4 my-4 ">
  
  {books.filter((item: any) => item.name && item.name.toLowerCase().includes(search.toLowerCase())||item.author && item.author.toLowerCase().includes(search.toLowerCase())
  


)
  .map((item: any,index: any) => (
    

        <a key={index} href="#" className="flex flex-col items-center md:h-40  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img className="object-cover h-full   rounded-t-lg md:w-1/2  md:rounded-none md:rounded-s-lg" src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=626&ext=jpg&ga=GA1.1.1532466403.1676939380&semt=sph" alt=""/>
      <div className="flex flex-col  h-full p-4 leading-normal  md:w-1/2 ">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{item.author}</h5>
         
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">{item.name}</p>
          <div className="flex justify-center">
         
          
          <button type="button"  className="text-fuchsia-700 hover:text-white border border-fuchsia-700 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-fuchsia-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-fuchsia-700 dark:text-fuchsia-700 dark:hover:text-white dark:hover:bg-fuchsia-900 dark:focus:ring-fuchsia-900">
            <Link href={`${item._id}`}>View Details</Link></button>
  
          
         
  
          </div>
      </div>
  </a> 
  ))}
  

  </div>
  </div>
       
      </div>
  
  
  
    )
}
