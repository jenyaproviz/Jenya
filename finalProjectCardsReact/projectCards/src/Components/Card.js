import React from "react";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img
          className="p-2"
          src={card.bizImage}
          width="100"
          alt={card.bizName}
        />
        <div className="card-body">
          <h5 className="card-title">{card.bizName}</h5>
          <p className="card-text">{card.bizDescription}</p>
          <p className="card-text border-top pt-2">
            <b>Tel: </b>
            {card.bizPhone}
            <br />
            {card.bizAddress}
          </p>
          <Link to={`/my-cards/edit/${card._id}`}>Edit</Link> |
          <Link className="ml-2" to={`/my-cards/delete/${card._id}`}>
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
