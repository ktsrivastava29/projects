import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const currentUser = {
    id: 1,
    username: "",
  };
  const [Open, setOpen] = useState(false);
  const [Active, setActive] = useState(false);
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const optionbar = () => {
    setOpen(!Open);
    setTimeout(() => {
      setOpen(false);
    }, "10000");
  };
  const { pathname } = useLocation();

  const isLoggedin = true;
  return (
    <div className={Active ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <span
            onClick={() => {
              window.location.href = "./";
            }}
          >
            VisuArt
          </span>
        </div>
        <div className="ln">
          <div className="clickables">
            <div className="links">
              <span
                onClick={() => {
                  window.location.href = "/texttoimg";
                }}
              >
                Image Generation
              </span>
              <span
                onClick={() => {
                  window.location.href = "./#developer-search";
                }}
              >
                Developer Search
              </span>
              <span
                onClick={() => {
                  window.location.href = "./prebuilt";
                }}
              >
                Prebuilt Designs
              </span>
              <span
                onClick={() => {
                  window.location.href = "./imgchnage";
                }}
              >
                Design Enhancement
              </span>
              {!isLoggedin && (
                <span
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Log In
                </span>
              )}
              {!isLoggedin && (
                <span
                  onClick={() => {
                    window.location.href = "/register";
                  }}
                >
                  Register
                </span>
              )}
            </div>
            {isLoggedin && (
              <div
                className="pp"
                onClick={() => {
                  optionbar();
                }}
              >
                <img src="img/ana.jpg" />
                <span>{currentUser?.username}</span>
                {Open && (
                  <div className="options">
                    <span
                      onClick={() => {
                        window.location.href = "/profile";
                      }}
                    >
                      Profile
                    </span>
                    <span
                      onClick={() => {
                        window.location.href = "/saved";
                      }}
                    >
                      Saved
                    </span>
                    <span>Log Out</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
