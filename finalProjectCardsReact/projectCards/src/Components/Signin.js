import React, { useState } from "react";
import PageHeader from "./ComponentsCommon/PageHeader";
import Joi from "joi-browser";
import Form from "./ComponentsCommon/Form";
import userService from "../services/userService";
import { Navigate } from "react-router-dom";
import Container from "@mui/material/Container";

function Signin() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  const doSubmit = async () => {
    const { email, password } = data;
    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ email: ex.response.data });
      }
    }
  };

  if (userService.getCurrentUser()) return <Navigate to="/" />;

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="SignIn Page"
        subtitle="On this page you can Sign In to this website !"
      ></PageHeader>

      <div className="row">
        <div className="col-lg-6">
          <Form
            data={data}
            schema={schema}
            errors={errors}
            onSubmit={doSubmit} // Use doSubmit here
            buttonText="Signin"
          >
            {(renderInput, renderButton) => (
              <form onSubmit={doSubmit} autoComplete="off" method="POST">
                {renderInput("email", "Email", "email")}
                {renderInput("password", "Password", "password")}

                <button
                  className="btn btn-primary mb-3"
                  style={{ fontSize: "16px", padding: "10px 20px" }} // Adjust the styles as needed
                  type="submit"
                >
                  Sign In
                </button>
              </form>
            )}
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Signin;
