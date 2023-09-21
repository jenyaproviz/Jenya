import React, { useState } from "react";
import PageHeader from "./ComponentsCommon/PageHeader";
import Joi from "joi-browser";
import cardService from "../services/cardService";
import { toast } from "react-toastify";

function CreateCard(props) {
  const [data, setData] = useState({
    bizName: "",
    bizDescription: "",
    bizAddress: "",
    bizPhone: "",
    bizImage: "",
  });

  const [errors, setErrors] = useState({});

  const schema = {
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).uri().allow(""),
  };

  const doSubmit = async () => {
    if (!data.bizImage) delete data.bizImage;
    await cardService.createCard(data);
    toast("A new card is opened");
    props.history.replace("/my-cards");
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return {};

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleChange = ({ currentTarget: input }) => {
    const updatedData = { ...data };
    updatedData[input.name] = input.value;

    setData(updatedData);
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Create Card Page"
        subtitle="On this page you can create new card!"
      ></PageHeader>

      <div className="row">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} autoComplete="off" method="POST">
            <Input
              type="text"
              name="bizName"
              value={data.bizName}
              label="Business Name"
              onChange={handleChange}
              error={errors.bizName}
            />
            <Input
              type="text"
              name="bizDescription"
              value={data.bizDescription}
              label="Business Description"
              onChange={handleChange}
              error={errors.bizDescription}
            />
            <Input
              type="text"
              name="bizAddress"
              value={data.bizAddress}
              label="Business Address"
              onChange={handleChange}
              error={errors.bizAddress}
            />
            <Input
              type="text"
              name="bizPhone"
              value={data.bizPhone}
              label="Business Phone"
              onChange={handleChange}
              error={errors.bizPhone}
            />
            <Input
              type="text"
              name="bizImage"
              value={data.bizImage}
              label="Business Image"
              onChange={handleChange}
              error={errors.bizImage}
            />
            <button type="submit">Create Card</button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default CreateCard;
