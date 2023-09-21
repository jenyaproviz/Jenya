import React from "react";
import { string } from "prop-types";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "../../styles/darkmode.css";

const PageHeader = ({ title, subtitle }) => {
  return (
    <Card className="text-center mb-3 darkHeader lightHeader">
      <Card.Header></Card.Header>
      <>
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {subtitle}
        </Typography>
        <Divider sx={{ my: 2 }}></Divider>
      </>
    </Card>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
};

export default PageHeader;
