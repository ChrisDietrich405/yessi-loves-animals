import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList() {
  return (
    <ImageList
      sx={{
        width: 1000,
        height: 350,
      }}
      cols={5}
      rowHeight={164}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          sx={{ position: "relative", width: "100%", height: "100%" }}
        >
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

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
