import React from "react";
import Link from "next/link";

import Navigator from "../Elements/Navigator";
import MenuFunctionIcons from "../Elements/MenuFunctionIcons";

export default function MenuTwo({ classname }) {
  return (
    <header className={`menu ${classname}  border-b border-line p-0 ` } style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="p-0">
        <div className="menu__wrapper">
          <h1>
            <Link href="/" className="menu__wrapper__logo block">
              <img src="/images/logos/RV_logo_transparent.png" alt="Logo" style={{ height: '140px' }} />
            </Link>
          </h1>
          <Navigator className={'style-two'} />
          <MenuFunctionIcons hide="button" />
        </div>
      </div>
    </header>
  );
}
