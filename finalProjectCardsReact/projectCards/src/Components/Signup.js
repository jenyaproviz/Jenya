import React, { useState } from "react";
import PageHeader from "./ComponentsCommon/PageHeader";
import Joi from "joi-browser";
import Form from "./ComponentsCommon/Form";
import http from "../services/httpService";
import apiUrl from "../config.json";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { Container } from "react-bootstrap";

// Function to refresh the form
const handleUserRefresh = () => {
  window.location.reload();
  handleClearForm(setData, setErrors); // Pass setData and setErrors as arguments
};

// Function to clear the form fields
const handleClearForm = (setData, setErrors) => {
  setData({
    email: "",
    password: "",
    name: "",
    firstName: "",
    lastName: "",
    phone: "",
    middleName: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  setErrors({});
};

function Signup(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    firstName: "",
    lastName: "",
    phone: "",
    middleName: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});
  const [isBusiness, setIsBusiness] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsBusiness(e.target.checked);
  };

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: (Joi.string().required().min(6).label("Password").pattern =
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@%$#^&*-_*(])[A-Za-zd!@%$#^&*-_*(]{8,}$"),
    name: Joi.string().required().min(2).label("Name"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    phone: Joi.string().required().label("Phone"),
    middleName: Joi.string().label("Middle Name"),
    state: Joi.string().label("State"),
    country: Joi.string().required().label("Country"),
    city: Joi.string().required().label("City"),
    street: Joi.string().required().label("Street"),
    houseNumber: Joi.string().label("House Number"),
    zip: Joi.string().label("Zip"),
  };

  const doSubmit = async () => {
    const formData = { ...data };
    formData.biz = isBusiness;

    //

    try {
      const response = await http.post(`${apiUrl}/users`, formData);
      const token = response.headers["x-auth-token"];

      if (token) {
        // Store the token in localStorage
        localStorage.setItem("token", token);
      }

      toast("A new account is opened");
      props.history.replace("/"); // Redirect to the homepage upon successful signup
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ email: "Email is taken" });
      }
    }
  };

  if (userService.getCurrentUser()) {
    return (
      <div>
        <p>Welcome, {userService.getCurrentUser().name}!</p>
      </div>
    );
  }

  return (
    <Container>
      <PageHeader
        title="REGISTER"
        subtitle="You can open a new account for free!"
      />
      <div className="row">
        <div className="col-lg-6">
          <Form
            data={data}
            schema={schema}
            errors={errors}
            onSubmit={doSubmit}
            buttonText="Signup"
          >
            {(renderInput, renderButton) => (
              <form onSubmit={doSubmit} autoComplete="off" method="POST">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      {renderInput("email", "Email", "Email", "email")}
                    </div>
                    <div className="mb-3">
                      {renderInput(
                        "password",
                        "Password",
                        "Password",
                        "password"
                      )}
                    </div>
                    <div className="mb-3">
                      {renderInput("name", "Name", "Name")}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      {renderInput("firstName", "First Name", "First Name")}
                    </div>
                    <div className="mb-3">
                      {renderInput("lastName", "Last Name", "Last Name")}
                    </div>
                    <div className="mb-3">
                      {renderInput("phone", "Phone", "Phone")}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      {renderInput("street", "Street", "Street")}
                    </div>

                    <div className="mb-3">
                      {renderInput("zip", "Zip", "Zip")}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      {renderInput("country", "Country", "Country")}
                    </div>
                    <div className="mb-3">
                      {renderInput("state", "State", "State")}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      {renderInput(
                        "houseNumber",
                        "House Number",
                        "House Number"
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      {renderInput("city", "City", "City")}
                    </div>
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="businessCheckbox"
                    checked={isBusiness}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="businessCheckbox"
                  >
                    Business
                  </label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    Signup
                  </button>
                </div>
              </form>
            )}
          </Form>

          <div className="d-grid">
            <div className="row">
              <div className="mt-3">
                <div className="col-md-6">
                  <button
                    className="btn btn-danger mb-2"
                    onClick={() => handleClearForm(setData, setErrors)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-dark ms-2 mb-2"
                    onClick={handleUserRefresh}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
