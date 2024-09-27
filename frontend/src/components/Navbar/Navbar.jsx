import { useNavigate } from "react-router-dom";
import map from "./assets/map.svg";
import medicine from "./assets/medicine.svg";
import news from "./assets/news.svg";
import building from "./assets/building.svg";

const Navbar = (props) => {
  const navigate = useNavigate();

  // Define an object to map props to image sources and routes
  const navItems = [
    { src: map, alt: "Map", route: "/", label: "home" },
    { src: news, alt: "News", route: "/news", label: "news" },
    {
      src: medicine,
      alt: "Medicine",
      route: "/manage-camps",
      label: "adminCamp",
    },
    { src: building, alt: "Building", route: "/camps", label: "camps" },
  ];

  return (
    <div className="relative align-middle shadow-inner flex items-center justify-around p-4">
      {navItems.map((item) => (
        <div key={item.label} className="relative flex flex-col items-center">
          <button
            onClick={() => navigate(item.route)}
            className={`hover:scale-110 transition-transform ${
              props.props === item.label ? "scale-100" : "scale-95" // Reduce size for non-active icons
            }`}
          >
            <img src={item.src} alt={item.alt} className="h-8 w-8" />{" "}
            {/* Set a uniform size for icons */}
          </button>
          {/* Underline if the current page matches the label */}
          {props.props === item.label && (
            <div className="absolute -bottom-[5px] h-1 w-full bg-black  transition-all duration-300" /> // Added bottom spacing
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
