'use client'

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import MobileNavSidebar from "./MobileNavSidebar";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function MenuFunctionIcons(props) {
  
  const hide = props.hide || "";

  const [showMobileNav, setShowMobileNav] = useState(false);
 
  return (
    <>
      <div
        className={`menu__wrapper__functions ${classNames(props.className)}`}
      >
        <div className="list__button flex items-center gap-6 pr-10">
          {!hide.includes("phone") && (
            <div className="flex items-center gap-2 bg-grey px-2.5 py-[5px] rounded-full max-xl:hidden">
              <span className="icon bg-white text-blue w-8 h-8 flex items-center justify-center rounded-full">
                <Icon.PhoneCall className="text-2xl flex-shrink-0" />
              </span>
              <span className="text-button text-blue whitespace-nowrap flex-shrink-0"> <a href="tel:+918977108950" className="text-blue-600 underline-none">
              +91 89771 08950
            </a>
            </span>
            </div>
          )}
          {/* <Link href={'/pages/contact-us'} className="button-main text-button-sm max-sm:hidden">Contact</Link> */}
        </div>
        <div className="list__icons flex items-center">
          
          { (
            <>
              
              <button
                className="menu-icon -navbar flex-shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMobileNav(!showMobileNav);
                }}
              >
                <Icon.List className="text-3xl" />
              </button>
            </>
          )}
          {!hide.includes("button") && (
            <Link href={'/pages/contact-us'} className="button-main max-sm:hidden ml-4">Get A quote</Link>
          )}
        </div>
      </div>
          
      <MobileNavSidebar
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />
    </>
  );
}
