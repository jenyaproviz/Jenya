import React, { useState, useEffect } from "react";
import PageHeader from "./ComponentsCommon/PageHeader";
import cardService from "../services/cardService";
import Card from "./Card";

function MyCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchMyCards() {
      const { data } = await cardService.getMyCards();
      if (data.length > 0) setCards(data);
    }

    fetchMyCards();
  }, []);

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="My Cards Page"
        subtitle="On this page you can find information about this website Enjoy!"
      ></PageHeader>
      <div className="row">
        {cards.length > 0 &&
          cards.map((card) => <Card key={card._id} card={card} />)}
      </div>
    </Container>
  );
}

export default MyCards;
