import React from "react";
import PageHeader from "./ComponentsCommon/PageHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { ImagesPage } from "../Helpers/Img";

export default function About() {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About Page"
        subtitle="On this page you can find information about this website Enjoy!"
      ></PageHeader>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} alignSelf="center">
          <b>Welcome to my Project. This is About us Page.</b> <br></br>An
          "About Us" page is a crucial part of a website, and it typically
          provides visitors with information about the website or company
          itself. This page serves to establish trust, build credibility, and
          give users a better understanding of who is behind the website and
          what its purpose or mission is. Here are the key elements typically
          found on an "About Us" page: Introduction: A brief introduction that
          welcomes visitors to the website or company. <br></br>Mission
          Statement: An explanation of the website or company's core mission,
          values, and goals. This helps visitors understand the purpose and
          philosophy behind the organization. History: A timeline or summary of
          the company's history, including when it was founded, significant
          milestones, and key achievements. Team: Information about the people
          behind the website or company, including the founders, key team
          members, and their roles. This can include bios and photos. Expertise:
          Details about the website or company's expertise, experience, or areas
          of specialization. This can help establish credibility and trust.
          Achievements and Awards: Any notable awards, recognitions, or
          achievements that the website or company has received. Customer
          Testimonials: Quotes or reviews from satisfied customers or users to
          build trust and demonstrate the website or company's impact. Contact
          Information: Contact details, including a physical address (if
          applicable), email address, phone number, and links to social media
          profiles. FAQs: Frequently asked questions that provide additional
          information about the website, company, or its products/services.
          Photos and Visuals: Images or videos that give visitors a visual
          glimpse into the company's workspace, products, or services. Values
          and Culture: Information about the company's values, culture, and
          commitment to social or environmental responsibility, if relevant.
          Partnerships and Collaborations: Information about any partnerships or
          collaborations the company has with other organizations or businesses.{" "}
          <br></br>The "About Us" page is an essential component of a website as
          it helps users connect with the brand, understand its background and
          values, and determine whether they can trust and engage with the
          website or company's offerings. It plays a significant role in
          establishing a positive online presence and fostering a sense of
          transparency and authenticity.
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          {ImagesPage.imgAboutPage}
        </Grid>
      </Grid>
    </Container>
  );
}
