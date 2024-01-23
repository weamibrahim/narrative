"use client";
import { IoBook } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { useEffect } from 'react';  // Import the useEffect hook

function Header() {
  const router = useRouter();
  const existingToken = cookies.get("token");
  const existingUserString = cookies.get("user");
  const existingUser = existingUserString ? JSON.parse(existingUserString) : null;

  const isLoggedIn = existingToken;
  const isAdmin = existingUser && existingUser.role === "admin";
  console.log(existingUser);
  console.log("isAdmin", isAdmin);

  useEffect(() => {
    // Redirect to home page if user is not an admin
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin, router]);

  const handleLogout = async () => {
    cookies.remove("token", { path: "/" });
    router.push("/login");
  };

  return (
    <div>
      <div className="text-xl p-1 bg-fuchsia-700 text-right">
       
      </div>
      <nav className="bg-gray-200">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <IoBook className="text-2xl text-fuchsia-700 mr-2" />
              <span style={{ fontFamily: "cursive" }} className="text-xl ">
               narrative
              </span>
            </div>

            <div className="hidden sm:flex ml-6 items-center">
              <div className="flex">
                <Link className="md:mx-3 text-lg hover:text-fuchsia-700" href="/">
                  Home
                </Link>
                
                {/* Add a dropdown under the "Dashboard" link */}
                {isAdmin && (
            <div className="group relative">
              <p
                className="md:mx-3 text-lg hover:text-fuchsia-700"
                
              >
                Dashboard
              </p>
              <div className="hidden group-hover:block absolute z-10 bg-white shadow-lg rounded-md mt-2 space-y-2">
                <Link
                  className="block px-4 py-2 text-sm text-fuchsia-700"
                  href="/Dashboard/books"
                >
                  Books
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-fuchsia-700"
                  href="/Dashboard/users"
                >
                  Users
                </Link>
              </div>
            </div>)}

                {isLoggedIn ? (
                  <>
                    <Link
                      className="md:mx-3 text-lg hover:text-fuchsia-700"
                      href="/profile"
                    >
                    <IoPersonOutline className="text-2xl text-fuchsia-700 mr-2" />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="md:mx-3 text-lg hover:text-fuchsia-700 block"
                    >
                      <MdLogout className="text-2xl text-fuchsia-700 mr-2" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      className="md:mx-3 text-lg hover:text-fuchsia-700"
                      href="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="md:mx-3 text-lg hover:text-fuchsia-700"
                      href="/regsister"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              className="md:mx-3 bg-fuchsia-700 text-white block rounded-md px-3 py-2 text-base font-medium "
              href="/home"
            >
              Home
            </Link>

            
            {isAdmin && (
            <div className="group relative">
              <p
                className="md:mx-3 text-lg hover:text-fuchsia-700"
               
              >
                Dashboard
              </p>
              <div className="hidden group-hover:block absolute z-10 bg-white shadow-lg rounded-md mt-2 space-y-2">
                <Link
                  className="block px-4 py-2 text-sm text-fuchsia-700"
                  href="/Dashboard/books"
                >
                  Books
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-fuchsia-700"
                  href="/Dashboard/users"
                >
                  Users
                </Link>
              </div>
            </div>)}

            {isLoggedIn ? (
              <>
                <Link
                  className="md:mx-3 text-lg hover:text-fuchsia-700"
                  href="/profile"
                >
                  <IoPersonOutline  className="text-2xl text-fuchsia-700 mr-2"/>
                </Link>
                <button
                  onClick={handleLogout}
                  className="md:mx-3 text-lg hover:text-fuchsia-700 block"
                >
                   <MdLogout className="text-2xl text-fuchsia-700 mr-2" />
                </button>
              </>
            ) : (
              <>
                <Link
                  className="md:mx-3 text-lg hover:text-fuchsia-700"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="md:mx-3 text-lg hover:text-fuchsia-700"
                  href="/regsister"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
