import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

export default function Navbar({ activeHeading }) {
  return (
    <div className="flex items-center">
      {navItems &&
        navItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.url}
              className={`${
                activeHeading === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
              } font-[500] px-2 lg:px-6 cursor-pointer`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
}

Navbar.propTypes = {
  activeHeading: PropTypes.number.isRequired,
};
