import React from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";

import menuData from "../../../data/header/navigation.json";
import ClientOnlyPortal from "../../../common/ClientOnlyPortal";

export default function NavigationFull({ showMenu, setShowMenu }) {
  return (
    <ClientOnlyPortal selector="#nav-full">
      <CSSTransition
        in={showMenu}
        unmountOnExit
        timeout={500}
        classNames="nav-full"
      >
        <div className="navigation-full">
          <div className="navigation-full__content">
            <a
              onClick={(e) => {
                e.preventDefault();
                setShowMenu(false);
              }}
              href="#"
              className="close-btn"
            >
              <i className="fas fa-times"></i>
            </a>
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
        </div>
      </CSSTransition>
    </ClientOnlyPortal>
  );
}
