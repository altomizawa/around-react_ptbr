import React from "react";

import "../Card/Card.css";
import "../Main/Main.css";
import trashCanACtive from "../../images/trashCan.svg";
import trashCanInactive from "../../images/trashCan_grey.svg";
import heartActive from "../../images/heart_active.svg";
import CloseButton from "../../images/Close_Icon.svg";
import heart from "../../images/heart.svg";
import { clientApi, thisUser } from "../constants";

export default function Card(props) {
  const isThisMyCard = thisUser._id === props.owner._id;
  const [isPopupActive, setIsPopupActive] = React.useState(false);

  //  ------------------handleCardClick-------------------------
  const handleCardClick = () => {
    setIsPopupActive(!isPopupActive);
    console.log(isPopupActive);
  };

  function popupActive(isPopupActive) {
    if (isPopupActive) {
      window.addEventListener("keydown", (evt) => {
        evt.key === "Escape" ? setIsPopupActive(!isPopupActive) : null;
      });
    }
  }
  //-----------------------Return JSX--------------------
  return (
    <>
      <div
        className={
          isPopupActive
            ? "popupwithimage popupwithimage_active"
            : "popupwithimage"
        }
      >
        <div className="popupwithimage__wrapper">
          <img
            src={CloseButton}
            alt="ícone X de fechar a janela"
            className="popupwithimage__close-button"
            onClick={handleCardClick}
          />
          <img
            src={props.link}
            className="popupwithimage__image-big"
            alt={props.name}
          />
          <p>{props.name}</p>
        </div>
      </div>
      <li className="card" id="">
        <button
          className="card__delete-button"
          style={{ display: isThisMyCard ? "block" : "none" }}
        >
          <img
            src={trashCanACtive}
            alt="ícone de lata de lixo"
            className="card__delete-icon card__delete-icon_active"
          />
          <img
            src={trashCanInactive}
            alt="ícone de lata de lixo"
            className="card__delete-icon card__delete-icon_inactive"
          />
        </button>
        <img
          src={props.link}
          alt={props.name}
          className="card__image"
          onClick={handleCardClick}
        />
        <div className="card__description-wrapper">
          <h4 className="card__title">{props.name}</h4>
          <div className="card__like-wrapper">
            <img
              src={heart}
              alt="imagem de um coração vazado"
              className="like-button like-button_inactive"
              id="like_off"
            />
            <img
              src={heartActive}
              alt="imagem de um coração vazado"
              className="like-button like-button_active like-button_hidden"
              id="like_on"
            />
            <p className="card__likes">{props.likes.length}</p>
          </div>
        </div>
      </li>
    </>
  );
}
