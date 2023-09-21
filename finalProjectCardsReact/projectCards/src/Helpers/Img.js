import React from "react";

export const ImagesPage = {
  imgMainPage: (
    <img
      src={require("./images/home.webp")}
      style={{ width: 1000 }}
      className="rounded mb-3"
    />
  ),
  imgAboutPage: (
    <img
      src={require("./images/about.webp")}
      style={{ width: 360 }}
      className="rounded mb-3"
    />
  ),
  imgErrorPage: (
    <img
      src={require("./images/robot.webp")}
      style={{ width: 360 }}
      className="rounded mb-3"
    />
  ),
};
