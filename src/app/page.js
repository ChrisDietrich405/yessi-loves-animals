import Image from "next/image";
import { Box, Container, Grid, Typography } from "@mui/material";
import ImageList from "./components/ImageList";

import styles from "./page.module.css";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "#282c34" }}>
      <Container className={styles.container}>
        <Grid
          container
          mt={2}
          spacing={{ xs: 0, md: 4 }}
          sx={{ justifyContent: "space-around" }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              width={233}
              height={333}
              className={styles.product_container_img}
              src="/img/yessi1.jpg"
              alt="Owner of an animal sanctuary holding her chicken."
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              className={styles.text}
              fontSize="32px"
              style={{
                textAlign: "left",
                margin: "40px 0px 20px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Hello. I'm Yessi and I love animals, especially chickens, ducks
              and geese. In fact I have an entire family of them! I also have a
              strong faith in God and the teachings of the Bible which tell us
              to be vegan.
            </Typography>

            <Typography
              sx={{
                marginTop: "10px",
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
        </Grid>
        <Box
          sx={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box className={styles.image_list_wrapper}>
            <ImageList sx={{ display: "flex", justifyContent: "center" }} />
          </Box>
        </Box>
        <Typography fontSize="32px" sx={{ textAlign: "center" }} mt={"24px"}>
          “Blessed are the merciful, for they will receive mercy.” —Matthew 5:7
        </Typography>
      </Container>
    </Box>
  );
}
