


"use client";
import { useState } from "react";
import { CartContext } from "@/app/context/CartContext";
import ShoppingCartButton from "@/app/ShoppingCartButton";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CartModal from "../CartModal";

import styles from "./style.module.css";

export default function ButtonAppBar() {
  const [modal, setModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [cartProducts, addProduct] = useContext(CartContext);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Link href="/" passHref>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/products" passHref>
            <ListItemText primary="Products" />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://www.youtube.com/@michiveg"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemText primary="YouTube" />
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#282c34" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <Image
                width={100}
                height={30}
                className={styles.navbar_image}
                src="/img/yessi-logo-200.png"
                alt="website logo"
              />
            </Link>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Link
              href="https://www.youtube.com/@michiveg"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                sx={{ marginRight: "20px" }}
                className={styles.navbar_btn}
                variant="contained"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube <YouTubeIcon sx={{ marginLeft: "5px" }} />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="contained"
                className={styles.navbar_btn}
                sx={{ fontWeight: 500, marginRight: "20px", color: "white" }}
              >
                Products
              </Button>
            </Link>
            <ShoppingCartButton />
            {/* <ShoppingCartIcon
              // onClick={toggleModal}
              sx={{ cursor: "pointer" }}
            /> */}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      {/* <CartModal open={modal} /> */}
    </Box>
  );
}
