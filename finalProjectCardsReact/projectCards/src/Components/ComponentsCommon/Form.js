import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "./Input";

function Form(props) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validate());
  }, [data]);

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, props.schema, options);

    if (!error) return {};

    const validationErrors = {};
    for (let item of error.details)
      validationErrors[item.path[0]] = item.message;
    return validationErrors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: props.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      props.doSubmit();
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) validationErrors[input.name] = errorMessage;
    else delete validationErrors[input.name];

    const updatedData = { ...data };
    updatedData[input.name] = input.value;

    setData(updatedData);
    setErrors(validationErrors);
  };

  const renderButton = (label) => (
    <button
      disabled={Object.keys(errors).length > 0}
      className="btn btn-primary"
    >
      {label}
    </button>
  );

  const renderInput = (name, label, type = "text") => (
    <Input
      type={type}
      name={name}
      value={data[name]}
      label={label}
      onChange={handleChange}
      error={errors[name]}
    />
  );

  return (
    <form onSubmit={handleSubmit}>
      {props.children(renderInput, renderButton)}
    </form>
  );
}

export default Form;
