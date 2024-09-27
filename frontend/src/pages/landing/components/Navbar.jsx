import React, { useState, useEffect } from "react";

import icon5 from '../assets/svgs/icon5.svg';
import icon4 from '../assets/svgs/icon4.svg';
import icon3 from '../assets/svgs/icon3.svg';
import icon2 from '../assets/svgs/icon2.svg';
import icon1 from '../assets/svgs/icon1.svg';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  useEffect(() => {
    const handleResize = () => setClick(window.innerWidth <= 960);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="bg-white p-4 shadow-lg rounded-md flex flex-r items-center space-y-1">
          {/* Buttons with icons */}
          <button className="hover:scale-110 transition-transform">
            <img src={icon2} alt="Icon 2" className="h-8 w-8" />
          </button>
          <button className="hover:scale-110 transition-transform mt-1">
            <img src={icon1} alt="Icon 1" className="h-8 w-8" />
          </button>
          <button className="hover:scale-110 transition-transform">
            <img src={icon3} alt="Icon 3" className="h-8 w-8" />
          </button>
          <button className="hover:scale-110 transition-transform">
            <img src={icon4} alt="Icon 4" className="h-8 w-8" />
          </button>
          <button className="hover:scale-110 transition-transform">
            <img src={icon5} alt="Icon 5" className="h-8 w-8" />
          </button>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          <i className={click ? "fas fa-times text-xl" : "fas fa-bars text-xl"}></i>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
