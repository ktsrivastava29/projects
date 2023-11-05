import React from "react";
import "../gigcard/gigcard.scss";
import save from "../gigcard/save-instagram.png";
import saved from "../gigcard/bookmark.png";
import { useState  } from "react";
// import {ana} from "../../../../bg-01.jpg"
// const theme = useContext(ThemeContext);
// let feature_ = -1
export const Img =({item})=>{
    return <div className="image">
    <img src = {item.img} />
    </div>
}
const Gigcard = ({ item }) => {
    const [isSaved, setsaved] = useState(item.state);
    const [initial,setInitial] =useState("initial");
    const handleclick=()=>{
        
    }
  return (
    <div className="gigcard">
      <img onClick={handleclick}  src={item.img} alt="" />
      <div className="info">
        <span>{item.desc}</span>
      </div>
     
      <div className="save">
        {!isSaved ? (
          <img
            onClick={() => {
              setsaved(!isSaved);
            }}
            src={save}
            alt=""
          />
        ) : (
          <img
            onClick={() => {
              setsaved(false);
            }}
            src={saved}
            alt=""
          />
        )}
      </div>
    </div>
  );
};
// const image_ = feature_
export default Gigcard

