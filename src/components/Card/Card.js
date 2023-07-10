import React from "react";

import "../Card/Card.css";
import "../Main/Main.css";
import trashCanACtive from "../../images/trashCan.svg";
import trashCanInactive from "../../images/trashCan_grey.svg";
import heartActive from "../../images/heart_active.svg";
import CloseButton from "../../images/Close_Icon.svg";
import heart from "../../images/heart.svg";
import { clientApi, thisUser } from "../constants";

function openPopup() {
  document.querySelector(".popupwithimage").classList.add("popup_active");
}

function closePopup() {
  document.querySelector(".popupwithimage").classList.remove("popup_active");
}

export default function Card(props) {
  const isThisMyCard = thisUser._id === props.owner._id;
  const [isPopupActive, setIsPopupActive] = React.useState(false);

  function handleOpenPopup() {
    setIsPopupActive(!isPopupActive);
  }

  return (
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
      <img src={props.link} alt="" className="card__image" />
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
  );
}

export default Card;
