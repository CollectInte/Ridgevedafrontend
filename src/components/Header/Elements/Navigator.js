'use client';
import { useRef, useEffect, useState } from 'react';
import Link from "next/link";
import classNames from "classnames";
import menuData from "@/data/header/navigation.json";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import { convertToSlug } from "@/common/utils";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../../styles/text.css';

const imageMap = [
  "/images/services/dropdown/icons/web-design.svg",
  "/images/services/dropdown/icons/pay-per-click.svg",
  "/images/services/dropdown/icons/social-media-marketing.svg",
  "/home/service/content.svg",
   "/images/services/dropdown/icons/call-center.svg",
];

export default function Navigator({ disableSubmenu, className }) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  
  const isHome = pathname === '/';
  const textColorClass = isHome ? 'text-white' : 'text-black';
  
  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function renderMenu() {
    return menuData.map((item, index) => {
      // Home
      if (item.title === "Home") {
        return (
          <li className={`relative ${pathname.includes('/home/') || pathname === '/' ? 'active' : ''}`} key={index}>
            <Link href={process.env.PUBLIC_URL + item.to}>
              <span>{item.title}</span>
            </Link>
          </li>
        );
      }

      // Careers
      if (item.title === "Careers") {
        return (
          <li className={`relative ${pathname.includes('/careers') ? 'active' : ''}`} key={index}>
            <Link href={process.env.PUBLIC_URL + item.to}>
              <span>{item.title}</span>
            </Link>
          </li>
        );
      }

      // Blogs
      if (item.title === "Blogs") {
        return (
          <li className={`relative ${pathname.includes('/blogs') ? 'active' : ''}`} key={index}>
            <Link href={process.env.PUBLIC_URL + item.to}>
              <span>{item.title}</span>
            </Link>
          </li>
        );
      }

      // ✅ Services with dropdown
      if (item.title === 'Services') {
        return (
          <li
            className={`relative ${pathname.includes('/services') ? 'active' : ''}`}
            key={index}
            ref={dropdownRef}
          >
            <div
              className="flex items-center gap-1 justify-between cursor-pointer py-2 px-3"
              onClick={() =>
                setDropdownOpen(dropdownOpen === index ? null : index)
              }
            >
              <span className={`text-sm font-bold ${textColorClass}`}>
                {item.title}
              </span>
              {dropdownOpen === index ? (
                <FaChevronUp size={12} className={textColorClass} />
              ) : (
                <FaChevronDown size={12} className={textColorClass} />
              )}
            </div>

            {item.subMenu.length > 0 && dropdownOpen === index && (
              <ul className="absolute z-50 bg-white shadow-lg rounded-md py-3 px-4 mt-2 min-w-[240px]">
                {item.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="dropdown-item flex items-center gap-2 py-1"
                  >
                    <img
                      src={imageMap[subIndex]}
                      alt={subItem}
                      className="w-5 h-5"
                    />
                    <Link
                      href={process.env.PUBLIC_URL + item.submenupage[subIndex]}
                      className="text-black"
                      onClick={() => setDropdownOpen(null)} // close on item click
                    >
                      {subItem}
                    </Link>
                  </li>
                ))}
                {item.subMenu.length % 2 !== 0 && (
                  <li className="dropdown-item empty-item"></li>
                )}
              </ul>
            )}
          </li>
        );
      }

      // Contact Us
      if (item.title === "Contact Us") {
        return (
          <li
            className={`relative ${pathname.includes('/' + convertToSlug(item.title.toLowerCase().replace(" ", "-"))) ? 'active' : ''}`}
            key={index}
          >
            <Link href={process.env.PUBLIC_URL + item.to}>
              <span>{item.title}</span>
            </Link>
          </li>
        );
      }

      // Default
      return (
        <li key={index}>
          <Link href={process.env.PUBLIC_URL + item.to}>
            <span>{item.title}</span>
          </Link>
        </li>
      );
    });
  }

  if (disableSubmenu) {
    return (
      <div className={`navigator -off-submenu ${classNames(className)}`}>
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
    <div className={`navigator ${classNames(className)}`}>
      <ul>{renderMenu()}</ul>
    </div>
  );
}
