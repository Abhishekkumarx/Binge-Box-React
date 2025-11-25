import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ onSearch, darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const location = useLocation(); // ✅ CORRECT: inside component

   // Clear search input when changing pages
  useEffect(() => {
    setSearchText("");  
  }, [location.pathname]);
  
  // Handle Search Submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    // Page type based on current route
    const pageType =
      location.pathname === "/series"
        ? "series"
        : location.pathname === "/movies"
        ? "movie"
        : "all"; // default for home

    onSearch(searchText.trim(), pageType);
  };
 
    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="
        fixed top-0 left-0 w-full h-20 flex items-center justify-between 
        px-4 md:px-6 z-50 
        bg-[var(--bg-dark)] dark:bg-[var(--bg-dark)]
        text-[var(--text-dark)] dark:text-[var(--text-dark)]
        border-b border-[var(--muted-dark)]/20
      ">



        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3163/3163478.png"
            alt="logo"
            className="w-7 h-7"
          />
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-red-600">Binge</span>Box
          </h1>
        </Link>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-[#414141] rounded-full px-3 py-2 w-40 sm:w-52 md:w-96"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-300 text-sm md:text-base"
          />
          <button type="submit">
            <i className="text-gray-300 text-lg md:text-xl cursor-pointer">🔍</i>
          </button>
        </form>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex space-x-8 text-lg">

          <Link
            to="/"
            onClick={scrollToTop}
            className={
              location.pathname === "/"
                ? "text-[var(--accent)] font-semibold"
                : "hover:text-[var(--accent)] text-[var(--text-dark)]"
            }
          >
            Home
          </Link>

          <Link
            to="/movies"
            onClick={scrollToTop}
            className={
              location.pathname === "/movies"
                ? "text-[var(--accent)] font-semibold"
                : "hover:text-[var(--accent)] text-[var(--text-dark)]"
            }
          >
            Movies
          </Link>

          <Link
            to="/series"
            onClick={scrollToTop}
            className={
              location.pathname === "/series"
                ? "text-[var(--accent)] font-semibold"
                : "hover:text-[var(--accent)] text-[var(--text-dark)]"
            }
          >
            Series
          </Link>
          <Link
            to="/about"
            onClick={scrollToTop}
            className={
              location.pathname === "/about"
                ? "text-[var(--accent)] font-semibold"
                : "hover:text-[var(--accent)] text-[var(--text-dark)]"
            }
          >
            About Us
          </Link>
        </nav>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 px-3 py-1 rounded-md bg-[var(--card-dark)] hover:bg-[var(--card-dark)]/90"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>



        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </header>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full z-40">
          <div className="bg-[var(--bg-dark)] text-[var(--text-dark)] w-full px-6 py-4 space-y-4 border-b border-[var(--muted-dark)]/20">

          

          <Link
            to="/"
            onClick={() => {
              scrollToTop();       // scroll page to top
              setMenuOpen(false);  // close mobile menu
            }}
            className={
              location.pathname === "/"
                ? "text-[var(--accent)] font-semibold block"
                : "block hover:text-[var(--accent)]"         
            }
          >
            Home
          </Link>


         <Link
          to="/movies"
          onClick={() => {
            scrollToTop();
            setMenuOpen(false);
          }}
          className={
            location.pathname === "/movies"
             ? "text-[var(--accent)] font-semibold block"
             : "block hover:text-[var(--accent)]"
      
          }
        >
          Movies
        </Link>


          <Link
            to="/series"
            onClick={() => {
              scrollToTop();
              setMenuOpen(false);
            }}
            className={
              location.pathname === "/series"
                ? "text-[var(--accent)] font-semibold block"
                : "block hover:text-[var(--accent)]"
          
            }
          >
            Series
          </Link>

          <Link
            to="/about"
            onClick={() => {
                scrollToTop();
                setMenuOpen(false);
              }}
            className={
              location.pathname === "/about"
                ? "text-[var(--accent)] font-semibold block"
                 : "block hover:text-[var(--accent)]"
            }
            
          >
            About Us
          </Link>
          
        </div>
      </div>
        
      )}
      
    </>
    );
}

export default Header;
