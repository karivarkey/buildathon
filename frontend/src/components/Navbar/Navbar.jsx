import map from "./assets/map.svg";
import medicine from "./assets/medicine.svg";
import news from "./assets/news.svg";
import building from "./assets/building.svg";

function Navbar() {
  return (
    
      <div className="align-middle  shadow-inner flex items-center justify-around h-max  p-4 ">
        <img src={map}  />
        <img src={medicine} />
        <img src={news} />
        <img src={building} />
      </div>
    
  );
}

export default Navbar;
