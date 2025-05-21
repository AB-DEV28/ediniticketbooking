import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrollposition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Navbar items
  const navItems = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
    { label: "Ticket", link: "/ticket" },
    { label: "About", link: "/about" },
    { label: "TicketRefund", link: "/refund" },
  ];

  // Handle click open
  const handleOpen = () => {
    setOpen(!open);
  };

  // Handle click close
  const handleClose = () => {
    setOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    // Remove user data from storage
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Navbar visibility logic on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine visibility of navbar based on scroll position
      if (currentScrollPos > scrollposition && currentScrollPos > 50) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up or at the top
      }

      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollposition]);

  // Check if user is logged in
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  return (
    <nav
      className={`w-full h-[8ch] fixed top-0 left-0 lg:px-24 md:px-16 sm:px-7 px-4 transition-transform duration-300 z-50 
      ${isVisible ? "translate-y-0" : "-translate-y-full"} 
      ${scrollposition > 50 ? "" : "bg-neutral-1/1"}`}
    >
      <div className="w-full h-full flex items-center justify-between">
        {/* Logo section */}
        <Link to="/" className="text-4xl text-red font-bold">
          Edini
        </Link>
        <div>
        </div>

        {/* Hamburger menu */}
        <div
          className="w-fit md:hidden flex items-center justify-center cursor-pointer flex-col gap-1 text-neutral-700"
          onClick={handleOpen}
        >
          {open ? <FaX className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </div>

        {/* Nav links and button */}
        <div
          className={`${open ? "flex absolute top-20 left-0 w-full h-auto md:relative" : "hidden"
            } flex-1 md:flex flex-col md:flex-row md:gap-14 gap-8 md:items-center items-start md:p-0 sm:p-4 p-4 justify-end md:bg-transparent bg-neutral-50 border md:border-transparent border-neutral-200 md:shadow-none sm:shadow-md shadow-md rounded-xl`}
        >
          {/* Nav links */}
          <ul className="list-none flex md:items-center items-start flex-wrap md:flex-row flex-col md:gap-8 gap-4 text-lg font-normal">
            {navItems.map((item, ind) => (
              <li key={ind}>
                <Link to={item.link} className="hover:text-red ease-in-out duration-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            {user ? (
              /* Show logout when logged in */
              <button 
                onClick={handleLogout} 
                className="btn md:w-fit w-full px-6 md:px-6 md:py-1 py-2.5 bg-red hover:bg-transparent border border-red hover:border-red md:rounded-full rounded-xl text-base font-normal text-neutral-50 hover:text-red ease-in-out duration-300"
              >
                Log out
              </button>
            ) : (
              /* Show login and signup when not logged in */
              <>
                <Link to="/login">
                  <button className="btn md:w-fit w-full px-6 md:px-6 md:py-1 py-2.5 bg-red hover:bg-transparent border border-red hover:border-red md:rounded-full rounded-xl text-base font-normal text-neutral-50 hover:text-red ease-in-out duration-300">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn md:w-fit w-full px-4 md:px-6 md:py-1 py-2.5 bg-red hover:bg-transparent border border-red hover:border-red md:rounded-full rounded-xl text-base font-normal text-neutral-50 hover:text-red ease-in-out duration-300">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
