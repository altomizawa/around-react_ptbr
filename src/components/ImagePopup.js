import React from "react";
import CloseButton from "../images/Close_Icon.svg";

export default function imagePopUp(props) {
  window.addEventListener("keydown", handleEsc);
  window.addEventListener("click", handleOverlayClick);

  function handleEsc(evt) {
    if (evt.key === "Escape") {
      props.onClose();
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("click", handleOverlayClick);
    }
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("popupwithimage_active")) {
      props.onClose();
      window.removeEventListener("click", handleOverlayClick);
      window.removeEventListener("keydown", handleEsc);
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
