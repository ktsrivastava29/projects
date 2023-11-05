import React, { useState } from "react";
import { cards } from "../../data.js";
import "../slider/slider.scss";
const Slider_ = () => {
  // console.log(cards, "jv");
  // const [end, setEnd] = useState();

  return (
    <div className="Slider">
      <div className="container">
        {cards.map((card) => (
          <img  id ="prebuilt-design"className= "img" key={card.id} src={card.img} alt="" />
        ))}
      </div>
      <h1>Explore more popular pre-built designs from title</h1>
      <button onClick={() => {
        window.location.href = "./prebuilt";
      }}>Explore More</button>
    </div>
  );
};

export default Slider_;
