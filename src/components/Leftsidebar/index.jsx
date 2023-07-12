import "./index.css";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { useState } from "react";
// import { AuthContext } from "../../context/authContext";
// import { useContext } from "react";

const LeftBar = () => {
  const [selectedItem, setSelectedItem] = useState("Friends");

  const allimgs = [
    { img: Friends, title: "Friends" },
    { img: Groups, title: "Groups" },
    { img: Market, title: "Market" },
    { img: Watch, title: "Watch" },
    { img: Memories, title: "Memories" },
    { img: Events, title: "Events" },
    { img: Gaming, title: "Generic" },
    { img: Gallery, title: "Gallery" },
  ];

  const clickedItem = (item) => {
    setSelectedItem(item);
  };

  //   const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      {allimgs.map((item) => (
        <div
          className={selectedItem == item.title ? "listStyles item" : "item"}
          onClick={() => clickedItem(item.title)}
          key={item.title}
        >
          <img src={item.img} alt="" />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default LeftBar;
