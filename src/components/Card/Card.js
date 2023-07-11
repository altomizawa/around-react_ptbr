import React from "react";
import ReactDOM from "react-dom/client";

import "../Card/Card.css";
import "../Main/Main.css";
import trashCanACtive from "../../images/trashCan.svg";
import trashCanInactive from "../../images/trashCan_grey.svg";
import heartActive from "../../images/heart_active.svg";
import CloseButton from "../../images/Close_Icon.svg";
import heart from "../../images/heart.svg";
import { clientApi, thisUser } from "../constants";
import PopupWithImage from "../PopupWithImage";



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
      <img src={props.link} alt={props.name} onClick={handleOpenPopup} className="card__image" />
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
      

        {/* <!-- -----------------DELETE CARD CONFIRMATION POPUP-------------------------> */}
        <div className="popup popup_delete-card-confirmation">
          <div className="popup__card">
            <img
              src={CloseButton}
              alt="ícone X de fechar a janela"
              className="popup__close-button"
            />
            <h4 className="popup__title">Excluir cartão?</h4>
            <button
              className="popup__confirmation-button"
              type="submit"
              enabled="true"
            >
              SIM
            </button>
          </div>
        </div>
        <div className={isPopupActive ? "popupwithimage popupwithimage_active" : "popupwithimage"}>
            <div className="popupwithimage__wrapper">
                <img
              src={props.link}
                alt="ícone X de fechar a janela"
                className="popupwithimage__close-button"
                />
                <img src={CloseButton} className="popupwithimage__image-big" alt="" />
                <p>""</p>
            </div>
        </div>

    </li>
  );
}

