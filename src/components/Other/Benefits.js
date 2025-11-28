import React from "react";

const benefitsData = [
  {
    image: "/images/benefits/1.png",
    name: "Free Shipping",
    content: "Free shipping on all order",
  },
  {
    image: "/images/benefits/2.png",
    name: "Valuable Gifts",
    content: "Free gift after every 10 order",
  },
  {
    image: "/images/benefits/3.png",
    name: "All Day Support",
    content: "Call us: +01 234 567 89",
  },
  {
    image: "/images/benefits/4.png",
    name: "Seasonal Sale",
    content: "Discounts up to 50% on all",
  },
];

export default function Benefits({ spaceBottom }) {
  return (
    <div
      className="benefits"
      style={{ marginBottom: spaceBottom || 100 / 16 + "rem" }}
    >
      <div className="container">
        <div className="row">
          {benefitsData.map((b, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="benefits__item">
                <div className="benefits__item__icon">
                  <img src={b.image} alt={b.name} />
                </div>
                <div className="benefits__item__content">
                  <h5>{b.name}</h5>
                  <p>{b.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
