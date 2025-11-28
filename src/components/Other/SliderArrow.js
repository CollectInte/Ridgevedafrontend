export const PrevArrow = ({ currentSlide, slideCount, ...arrowProps }) => (
  <a {...arrowProps} href="#">
    <i className="fas fa-angle-left"></i>
  </a>
);

export const NextArrow = ({ currentSlide, slideCount, ...arrowProps }) => (
  <a {...arrowProps} href="#">
    <i className="fas fa-angle-right"></i>
  </a>
);
