import Navbar from "./components/Navbar";
import { Grid, Typography, Container, Box } from "@mui/material";
import ImageList from "./components/ImageList";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div sx={{ backgroundColor: "#282c34" }}>
      <Navbar />
      <Container sx={{ marginBottom: "40px" }}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={4} style={{ alignItems: "right" }}>
            {" "}
            <img
              className={styles.practice_picture}
              src="../img/yessi1.jpg"
              alt="practice"
            />
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "space-around",
              height: "400px",
            }}
          >
            <Typography
              fontSize="32px"
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              Hello. I'm Yessi and I love animals, especially chickens, ducks
              and geese. In fact I have an entire family of them! I also have a
              strong faith in God and the teachings of the Bible which tell us
              to be vegan.
            </Typography>

            <Typography
              sx={{
                padding: "10px 30px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              “And God said, ‘Behold, I give you every plant that produces seeds
              upon the earth and every tree that has fruit with its seed inside
              of it: these shall be your food. And I give all green plants to
              every wild animal and to all the birds of the air and to all
              creatures that move upon the surface of the earth and that have
              the breath of life in them.’ And it was so.” —Genesis 1:29-30
            </Typography>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}></Grid>
        </Grid>
        <Box
          sx={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ImageList sx={{ display: "flex", justifyContent: "center" }} />
        </Box>
        <Typography fontSize="32px" sx={{ textAlign: "center" }}>
          “Blessed are the merciful, for they will receive mercy.” —Matthew 5:7
        </Typography>
      </Container>
    </div>
  );
}
