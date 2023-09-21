import React, { useState } from "react";
import PageHeader from "./ComponentsCommon/PageHeader";
import Joi from "joi-browser";
import http from "../services/httpService";
import apiUrl from "../config.json";
import userService from "../services/userService";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function BizSignup() {
  const [data, setData] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  const doSubmit = async () => {
    const newData = { ...data };
    newData.biz = true;

    try {
      await http.post(`${apiUrl}/users`, newData);
      await userService.login(newData.email, newData.password);
      window.location = "/create-card";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ email: "Email is taken" });
      }
    }
  };

  if (userService.getCurrentUser()) return <Navigate to="/" />;

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Business Registration Page"
        subtitle="You can register for this website for free!"
      ></PageHeader>
      <div className="row">
        <div className="col-12">
          <p>Open a business account for free!</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <form onSubmit={doSubmit} autoComplete="on" method="POST">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <button type="submit" className="btn btn-primary">
              Next
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default BizSignup;
