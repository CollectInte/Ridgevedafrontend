import Button from "./Button";
import classNames from "classnames";

export default function AddToCart({ onClick, className }) {
  return (
    <div className={`button-main ${classNames(className)}`} onClick={onClick}>
      Add to cart
    </div>
  );
}
