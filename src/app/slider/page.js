'use client';
import React, { useState, useEffect,useRef  } from "react";
import "../../styles/slider.css";

const Slider = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No slider data found</p>; // or return null or skeleton
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
        indexRef.current = newIndex;
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, data.length]);

  const changeSlide = (direction) => {
    setIsPaused(true);

    setCurrentIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex === data.length - 1 ? 0 : prevIndex + 1;
      } else if (direction === "prev") {
        return prevIndex === 0 ? data.length - 1 : prevIndex - 1;
      }
      return prevIndex;
    });

    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section className={`process-slider ${isPaused ? "paused" : ""}`}>
      <button className="arrow left" onClick={() => changeSlide("prev")}>❮</button>
      <div className="process-container">
        {data.map((step, index) => (
          <div
            key={step.id}
            className={`process-slide ${index === currentIndex ? "active" : "hidden"}`}
          >
            <div className="process-content">
              <img src={step.img} alt={step.alt} />
            </div>
            <h1>{step.head}</h1>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
      <button className="arrow right" onClick={() => changeSlide("next")}>❯</button>
    </section>
  );
};


export default Slider;
