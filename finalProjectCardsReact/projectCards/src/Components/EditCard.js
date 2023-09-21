import React, { useState, useEffect } from "react";
import PageHeader from "./ComponentsCommon/PageHeader";
import Joi from "joi-browser";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

function EditCard(props) {
  const [data, setData] = useState({
    bizName: "",
    bizDescription: "",
    bizAddress: "",
    bizPhone: "",
    bizImage: "",
  });

  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.string(),
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

  useEffect(() => {
    async function fetchData() {
      const cardId = props.match.params.id;
      const { data: cardData } = await cardService.getCard(cardId);
      setData(mapToViewModel(cardData));
    }

    fetchData();
  }, [props.match.params.id]);

  const mapToViewModel = (card) => ({
    _id: card._id,
    bizName: card.bizName,
    bizDescription: card.bizDescription,
    bizAddress: card.bizAddress,
    bizPhone: card.bizPhone,
    bizImage: card.bizImage,
  });

  const doSubmit = async () => {
    await cardService.editCard(data);
    toast("Card is Updated");
    props.history.replace("/my-cards");
  };

  const handleCancel = () => {
    props.history.push("/my-cards");
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Edit Card Page"
        subtitle="On this page you can edit cards!"
      ></PageHeader>

      <div className="row">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} autoComplete="off" method="POST">
            {renderInput("bizName", "Business Name")}
            {renderInput("bizDescription", "Business Description")}
            {renderInput("bizAddress", "Business Address")}
            {renderInput("bizPhone", "Business Phone")}
            {renderInput("bizImage", "Business Image")}
            {renderButton("Update Card")}
            <button className="btn btn-secondary ml-2" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default EditCard;
