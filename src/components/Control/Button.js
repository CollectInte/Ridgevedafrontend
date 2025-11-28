import Link from "next/link";
import classNames from "classnames";

export default function Button(props) {
  const {
    action,
    as,
    content,
    color,
    height,
    width,
    className,
    onClick,
    disable,
  } = props;
  return (
    <Link className="flex items-center justify-center" href={disable ? "#" : action}>
      <span
        className={`btn flex items-center justify-center -${classNames(color)} ${classNames(className)}`}
        onClick={onClick}
        style={{
          height: height,
          width: width,
          paddingTop: height && 0,
          paddingBottom: height && 0,
          paddingLeft: width && 0,
          paddingRight: width && 0,
          pointerEvents: disable && none,
        }}
      >
        {content}
      </span>
    </Link>
  );
}
