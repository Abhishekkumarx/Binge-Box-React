import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation(); 

  return (
    // <footer className="w-full py-8 bg-[--bg-light] dark:bg-[--bg-dark] text-[--text-light] dark:text-[--text-dark]">
      <footer
  id="site-footer"
  className="bg-black text-white py-10"
>


      <div className="max-w-6xl mx-auto text-center mb-12 px-2">
        <h1 className="text-3xl font-bold text-red-600 mb-4">ABOUT US</h1>

        <p className=" max-w-3xl mx-auto text-sm sm:text-base leading-relaxed ">
          BingeBox is a free platform to explore Movies and TV Series.  
          Discover details, ratings, and trailers of all your favorite content.
        </p>

        <p className=" mt-3 text-xs sm:text-sm">
          *We do not host or upload any videos. All content links belong to third-party providers.*
        </p>
      </div>

      <nav className="
        flex flex-col items-center gap-4 
        text-base 
        sm:flex-row sm:justify-center sm:gap-10
      ">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className={
            location.pathname === "/"
              ? "text-red-600 font-bold"
              : " hover:text-red-500"
          }
        >
          Home
        </Link>

        <Link
          to="/movies"
          className={
            location.pathname === "/movies"
              ? "text-red-600 font-bold"
              : " hover:text-red-500"
          }
        >
          Movies
        </Link>

        <Link
          to="/series"
          className={
            location.pathname === "/series"
              ? "text-red-600 font-bold"
              : " hover:text-red-500"
          }
        >
          Series
        </Link>


        <Link
          to="/contactus"
          className={
            location.pathname === "/contactus"
              ? "text-red-600 font-bold"
              : " hover:text-red-500"
          }
        >
          Contact Us
        </Link>

        
        <Link
          to="/terms"
          className={
            location.pathname === "/terms"
              ? "text-red-600 font-bold"
              : " hover:text-red-500"
          }
        >
          Terms & Conditions
        </Link>

      </nav>

      <div className="text-center text-gray-500 text-xs sm:text-sm mt-10">
        © {new Date().getFullYear()} BingeBox — All Rights Reserved.
      </div>
    </footer>
  );
}
