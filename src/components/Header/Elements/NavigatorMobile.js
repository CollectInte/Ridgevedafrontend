'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import menuData from "@/data/header/navigation.json";
import { usePathname } from "next/navigation";
import "../../../styles/text.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CallIcon from '@mui/icons-material/Call';
import { Call } from "@mui/icons-material";

const imageMap = [
  "/home/service/web-design.svg",
  "/home/service/social-media-mark.svg",
  "/images/services/dropdown/icons/graphic-design.svg",
  "/images/services/dropdown/icons/writer.svg",
  "/images/services/dropdown/icons/web-design.svg",
  "/home/service/pay-per-click.svg",
  "/images/services/dropdown/icons/influencer.svg",
   "/images/services/dropdown/icons/money.png",
    "/home/service/content.svg",
];

export default function Navigator({ disableSubmenu, className }) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 600 : false
  );

  // Handle window resize to update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".dropdown-wrapper")) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function toggleDropdown() {
    setDropdownOpen((prev) => !prev);
  }

  function renderMenu() {
    return menuData.map((item, index) => {
      if (item.title === "Services" && item.subMenu?.length > 0) {
        return (
          <li key={index} className="relative">
            <div
              className="dropdown-wrapper"
              // onMouseEnter={() => setDropdownOpen(true)}
              // onMouseLeave={() => setDropdownOpen(false)}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
                setDropdownOpen(true);
              }}
            >
              <span className="cursor-pointer" style={{fontWeight:"bolder",fontSize:"15px"}}>{item.title}<ArrowDropDownIcon/></span>

              {dropdownOpen && (
                <ul
                  className="dropdown-menu-mobile service-dropdown"
                  style={{ left: isMobile ? "0px" : "-270px" }}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="dropdown-item-mobile service-list-dropdown"
                    >
                      <img
                        src={imageMap[subIndex]}
                        alt={subItem}
                        className="menu-icon-mobile"
                         
                      />
                      <Link
                        href={item.submenupage[subIndex]}
                        className="dropdown-link-mobile"
                      >
                        {subItem}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      }
      return (
        <>
        <li
          className={classNames("relative", {
            active: pathname.includes(item.to),
          })}
          key={index}
        >
          <Link href={process.env.PUBLIC_URL + item.to}>
            <span style={{fontWeight:"bolder",fontSize:"15px"}}>{item.title}</span>
          </Link>
        </li>
        </>
      );
    });
  }

  if (disableSubmenu) {
    return (
      <div className={classNames("navigator -off-submenu", className)}>
        <ul>
          {menuData.map((item, index) => (
            <li key={index}>
              <Link href={process.env.PUBLIC_URL + item.to}>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={classNames("navigator", className)}>
      <ul>{renderMenu()}</ul>
      <a href="tel:+9189771 08950"><button style={{backgroundColor:"rgb(71,101,228)",padding:"5px",color:"white",borderRadius:"5px",marginTop:"5px",fontWeight:"bold"}}><Call/> +91 89771 08950</button></a>
    </div>
  );
}
