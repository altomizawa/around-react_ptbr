import React from "react";

import PencilButton from "../images/Pencil.svg";
import AddButton from "../images/Plus-sign.svg";
import Card from "./Card";

function Main(props) {
  // --------------------MAP CARDS-------------------------
  const cardsData = props.cards.map((card, i) => (
    <Card
      key={i}
      {...card}
      card={card}
      onCardClick={props.handleCardClick}
      handleCardDelete={props.handleCardDelete}
      selectedCard={props.selectedCard}
      user={props.user}
      handleCardLike={props.handleCardLike}
      handleCardDislike={props.handleCardDislike}
    />
  ));

  return (
    <main>
      {/* <!-- ------------------------PROFILE INFO------------------------------ --> */}
      <div className="profile">
        <div className="profile__info">
          <div
            className="profile__picture-wrapper"
            onClick={props.onEditAvatarClick}
          >
            <div className="profile__picture-overlay">
              <img
                src={PencilButton}
                alt="pencil to edit avatar"
                className="profile__picture-icon"
              />
            </div>
            <img
              src={props.user.avatar}
              alt="Avatar"
              className="profile__picture"
            />
          </div>
          <div className="profile__text-wrapper">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{props.user.name}</h1>
              <button
                onClick={props.onEditProfileClick}
                className="profile__edit"
              >
                <img src={PencilButton} alt="ilustração de um lápis" />
              </button>
            </div>
            <h2 className="profile__title">{props.user.about}</h2>
          </div>
        </div>
        {/* -- ------------------------ADD NEW CARD BUTTON------------------------------ --> */}{" "}
        */}
        <button className="adicionar-button" onClick={props.onAddPlaceClick}>
          <img
            src={AddButton}
            alt="sinal de mais para adicionar imagem"
            className="adicionar-button__image"
          />
        </button>
      </div>
      {/* -- ------------------------RENDER CARD LIST------------------------------ --> */}{" "}
      <ul className="cards">{cardsData}</ul>
    </main>
  );
}

export default Main;
