"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    if (!user.email) {
      newErrors.email = "Please enter a valid email address.";
      formIsValid = false;
    }

    if (!user.password || user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        router.push("/");
        const data = await response.json();

       localStorage.setItem("token", data.token);
       localStorage.setItem("user", JSON.stringify(data.user));
       
       
      } else {
        if (response.status === 401) {
          const errorData = await response.json();
          console.error("Login failed:", errorData.errors);
          
          setErrors({ ...errors, password: errorData.errors.password });
        } else if (response.status === 404) {
          const errorData = await response.json();
          console.error("User not found:", errorData.errors.email);
          setErrors({ ...errors, email: errorData.errors.email });
        } else {
          console.error("An unexpected error occurred");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className=" md:flex md:w-1/2 md:h-screen sm:w-64 bg-cover bg-center" >
        <img src="https://img.freepik.com/free-vector/literature-concept-illustration_114360-8403.jpg?t=st=1722981509~exp=1722985109~hmac=97e97fb516be86624c2cdc965b6c45608e1d3b276be0709a130efb1e1fdf260d&w=740"/>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className=" w-full p-5">
          <h1 className="text-3xl text-center font-bold mb-5">Login</h1>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
               Email
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.email}</div>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
               password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.password}</div>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Login
              </button>
            </div>
            <p>Don't have an account? <Link href="/regsister" className="text-purple-600 hover:underline dark:text-purple-500">Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
