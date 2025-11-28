'use client'

import React, { useState, useEffect } from "react";
import classNames from "classnames";
import * as Icon from "@phosphor-icons/react/dist/ssr";

import { product } from "../../common/variables";

export default function Quantity({
  className,
  defaultQuantity,
  getQuantity,
  onDecrease,
  onIncrease,
  maxValue,
}) {
  const [quantity, setQuantity] = useState(
    defaultQuantity || product.DEFAULT_QUANTITY
  );
  useEffect(() => {
    getQuantity && getQuantity(quantity);
  }, [quantity]);
  return (
    <div className={`quantity-controller ${classNames(className)}`}>
      <div
        className={`quantity-controller__btn -descrease ${quantity < 2 ? 'disabled' : ''}`}
        onClick={() => {
          if (quantity < 2) {
            return;
          }
          setQuantity(quantity - 1);
          onDecrease && onDecrease();
        }}
      >
        <Icon.Minus weight="bold" />
      </div>
      <h5 className="quantity-controller__number text-button">{quantity}</h5>
      <div
        className="quantity-controller__btn -increase"
        onClick={() => {
          if (quantity >= maxValue) {
            return;
          }
          setQuantity(quantity + 1);
          onIncrease && onIncrease();
        }}
      >
        <Icon.Plus weight="bold" />
      </div>
    </div>
  );
}
