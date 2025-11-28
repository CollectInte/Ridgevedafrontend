import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import ClientOnlyPortal from "../../../common/ClientOnlyPortal";
import NavigatorMobile from "./NavigatorMobile";
import SocialIcons from "../../Other/SocialIcons";
import Select from "../../Control/Select";
import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function MobileNavSidebar({ showMobileNav, setShowMobileNav }) {
  const [searchInput, setSearchInput] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("ENG");
  return (
    <>
      <ClientOnlyPortal selector="#nav-sidebar">
        <CSSTransition
          in={showMobileNav}
          unmountOnExit
          timeout={200}
          classNames="cart-sidebar"
        >
          <div className="navigation-sidebar">
            
            <NavigatorMobile />
            
          </div>
        </CSSTransition>
      </ClientOnlyPortal>
      {showMobileNav && (
        <ClientOnlyPortal selector="#overlay">
          <div
            className="overlay"
            onClick={() => setShowMobileNav(false)}
          ></div>
        </ClientOnlyPortal>
      )}
    </>
  );
}
