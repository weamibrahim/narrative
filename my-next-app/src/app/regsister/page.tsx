"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Validate inputs
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!user.name) {
      newErrors.name = "Please enter your name.";
      formIsValid = false;
    }

    if (!user.email) {
      newErrors.email = "Please enter a valid email address.";
      formIsValid = false;
    }

    if (!user.password || user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      formIsValid = false;
    }

    if (!user.address) {
      newErrors.address = "Please enter your address.";
      formIsValid = false;
    }

    setErrors(newErrors);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        if (response.status === 422) {
          const errorData = await response.json();

          console.error("Validation failed:", errorData.errors);

          setErrors(errorData.errors);
        } else {
          console.error("An unexpected error occurred");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className=" md:flex md:w-1/2 sm:w-64  bg-cover bg-center">
      <img src="https://img.freepik.com/free-photo/view-3d-islamic-quran-book_23-2151112585.jpg?ga=GA1.1.1070693569.1706463458&semt=ais_hybrid'" alt="login" />

      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className=" w-full p-10">
          <h1 className="text-3xl text-center font-bold mb-5">Signup</h1>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.name}</div>
              )}
            </div>

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
                Password
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

            <div className="mb-5">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="address"
                id="address"
                value={user.address}
                onChange={handleInputChange}
              />
              {errors.address && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{errors.address}</div>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                name="phone"
                id="phone"
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Register
              </button>

            </div>
            <p>Already have an account? <Link href="/login" className="text-purple-700">Login</Link></p>
          </form>
        </div>
      </div>
     
    </div>
  );
}
