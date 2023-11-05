import React from "react";
import "./home.scss";
// import { Slider } from "@mui/material";
import Slider_ from "../../comonents/slider/slider.js";
import Footer from "../../comonents/footer/footer.js";

const Home = () => {
  return (
    <div className="home">
      <div className="searchbar">
        <div className="left" id="developer-search">
          <h1>
            Bringing <i>Your Imagination</i> to Life: AI-Powered Images from{" "}
            <i>Your Sketches</i>
          </h1>
          <div className="search">
            <div className="searchinput">
              <img src="img/search.png" alt=""></img>
              <input type="search" placeholder="'Discover a new realm '"></input>
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button
              onClick={() => {
                window.location.href = "./#img-generation";
              }}
            >
              Image Generation
            </button>
            <button
              onClick={() => {
                window.location.href = "./#img-generation";
              }}
            >
              Design Enhancemen
            </button>
            <button
              onClick={() => {
                window.location.href = "./#developer-search";
              }}
            >
              Developer Search
            </button>
            <button
              onClick={() => {
                window.location.href = "./#prebuilt-design";
              }}
            >
              Prebuilt Designs
            </button>
          </div>
        </div>
        <div className="right">
          <img src="img/womanai.png" alt=""></img>
        </div>
      </div>
      <div className="features" id="img-generation">
        <div className="container">
          <div className="item">
            <h1>
              Welcome to our innovative website that harnesses the power of
              artificial intelligence!{" "}
            </h1>
            <div className="title">
              <img src="img\check.png" alt="" />
              How it Works:
            </div>
            <p>
              Our cutting-edge AI algorithms analyze your sketches and interpret
              your descriptive text to understand the details, colors, and
              context you envision.
            </p>
            <div className="title">
              <img src="img\check.png" alt="" />
              Quality work done quickly
            </div>
            <p>Witness your ideas come to life effortlessly</p>
            <div className="title">
              <img src="img/check.png" alt="" />
              Through advanced neural networks
            </div>
            <p>Reflect your artistic vision with impressive accuracy</p>
            <div className="title">
              <img src="img/check.png" alt="" />
              Endless Possibilities:
            </div>
            <p>
              Design characters for your comic book, envision concept art for
              video games, experiment with your imagination.
            </p>
            <div className="button">
              <button
                onClick={()=>{window.location.href ="/imgchnage"}}
              >
                Sketch to <i>img</i>
              </button>
            </div>
          </div>
          <div className="img">
            <img src="img/sunrise.jpg" />
            <button onClick={() => {
              window.location.href = "/texttoimg";
            }}>
              Text to <i>img</i>
            </button>
          </div>
        </div>
      </div>

      <div className="slider">
        <Slider_ />
      </div>
    </div>
  );
};
export default Home;
