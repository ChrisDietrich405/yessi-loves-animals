import * as React from "react";

import styles from "./styles.module.css";

const itemData = [
  {
    img: "../img/yessi11.jpeg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi9.jpg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi3.jpg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi4.jpg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi12.jpg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi6.jpg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi7.jpg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi10.jpg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi8.jpg",
    title: "Breakfast",
  },
  {
    img: "../img/yessi2.jpg",
    title: "Breakfast",
  },
];
export default function ImageList() {
  {
    return itemData.map((item) => {
      return (
        <div className={styles.images}>
          <img src={item.img} alt={item.title} />
        </div>
      );
    });
  }
}
