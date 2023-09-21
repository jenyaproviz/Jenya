import React from "react";
import PageHeader from "./ComponentsCommon/PageHeader";
import Container from "@mui/material/Container";
import { ImagesPage } from "../Helpers/Img";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Home Page "
        subtitle="Welcome to my site! Here you can find all cards from all customers."
      ></PageHeader>

      <div
        className="mb-3 text-lg-center  "
        item
        xs={4}
        sx={{
          display: { md: "flex", xs: "none" },
          justifyContent: "center",
        }}
      >
        {ImagesPage.imgMainPage}
      </div>
    </Container>
  );
}
