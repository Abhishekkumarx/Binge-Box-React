import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 w-full h-20 bg-[#0e0d0d] text-white px-4 md:px-6 flex items-center justify-between z-50"
      >
        {/* LOGO */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3163/3163478.png"
            alt="logo"
            className="w-7 h-7"
          />
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-red-600">Binge</span>Box
          </h1>
        </div>

        {/* SEARCH (ALWAYS VISIBLE) */}
        <div className="flex items-center bg-[#414141] rounded-full px-3 py-2 w-40 sm:w-52 md:w-96">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-gray-300 text-sm md:text-base"
          />
          <i className="text-gray-300 text-lg md:text-xl cursor-pointer">🔍</i>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex space-x-8 text-lg">
          <a href="#" className="text-red-500 underline underline-offset-4">
            Home
          </a>
          <a href="#" className="hover:text-red-500">Movies</a>
          <a href="#" className="hover:text-red-500">TV Series</a>
          <a href="#" className="hover:text-red-500">About Us</a>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </header>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#0e0d0d] text-white w-full px-6 py-4 space-y-4 fixed top-20 left-0 z-40">
          <a href="#" className="block text-red-500 underline underline-offset-4">
            Home
          </a>
          <a href="#" className="block hover:text-red-500">Movies</a>
          <a href="#" className="block hover:text-red-500">TV Series</a>
          <a href="#" className="block hover:text-red-500">About Us</a>
        </div>
      )}
    </>
  );
}

export default Header;
