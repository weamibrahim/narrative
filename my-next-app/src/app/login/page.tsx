"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

    if (!user.email ) {
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
      } else {
        if (response.status === 401) {
          const errorData = await response.json();
          console.error("Login failed:", errorData.message);
          setErrors({ ...errors, email: errorData.message }); 
        } else if (response.status === 404) {
          const errorData = await response.json();
          console.error("User not found:", errorData.message);
          setErrors({ ...errors, email: errorData.message });
        } else {
          console.error("An unexpected error occurred");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="shadow-2xl shadow-gray-700 w-full p-10">
      <h1 className="text-3xl text-center font-bold mb-5">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
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
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
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
            <p className="text-red-500 text-sm">{errors.password}</p>
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
      </form>
    </div>
  );
}
