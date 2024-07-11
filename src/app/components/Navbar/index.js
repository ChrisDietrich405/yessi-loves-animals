import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import styles from "./style.module.css";

export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#282c34" }}>
        <Toolbar>
          <img
            className={styles.navbar_image}
            src="../img/yessi-logo-200.png"
            alt="website logo"
          />
          {/* Add a Box to take up space and push the button to the center */}
          <Box sx={{ flexGrow: 1 }} />
          <Link
            href="https://www.youtube.com/@michiveg"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className={styles.navbar_btn}
              
              variant="contained"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yessi's YouTube Channel
            </Button>
          </Link>
          {/* Add another Box with flexGrow to balance the spacing */}
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
