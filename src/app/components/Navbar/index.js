import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
