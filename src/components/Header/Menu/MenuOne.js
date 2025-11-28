import React from "react";
import Link from "next/link";

import Navigator from "../Elements/Navigator";
import MenuFunctionIcons from "../Elements/MenuFunctionIcons";
import { renderContainer } from "../../../common/utils";

export default function MenuOne({ container }) {
  return (
    <header className="menu -style-1 bg-white border-b border-outline ">
      <div className="xl:px-3 px-2 py-2">
        <div className="menu__wrapper">
          <h1>
            <Link href="/" className="menu__wrapper__logo block">
              <img src="/images/logos/RV_logo_white.png" alt="Logo" style={{height:"85px"}} />
            </Link>
          </h1>
          <Navigator />
          <MenuFunctionIcons hide="button" />
        </div>
      </div>
    </header>
  );
}
