import React from "react";
import CloseButton from "../images/Close_Icon.svg";

export default function imagePopUp(props) {
  function setEventListeners() {
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("click", handleOverlayClick);
  }

  function removeEventListeners() {
    window.removeEventListener("keydown", handleEsc);
    window.removeEventListener("click", handleOverlayClick);
  }

  setEventListeners();

  function handleEsc(evt) {
    if (evt.key === "Escape") {
      props.onClose();
      removeEventListeners();
    }
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("popupwithimage_active")) {
      props.onClose();
      removeEventListeners();
    }
  }

  return (
    <div className="popupwithimage popupwithimage_active">
      <div className="popupwithimage__wrapper">
        <img
          src={CloseButton}
          alt="ícone X de fechar a janela"
          className="popupwithimage__close-button"
          onClick={props.onClose}
        />
        <img
          src={props.card.link}
          className="popupwithimage__image-big"
          alt="props.name"
        />
        <p>{props.card.name}</p>
      </div>
    </div>
  );
}
