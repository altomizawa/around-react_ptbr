import React from "react";

import "../Card/Card.css";
import "../Main/Main.css";
import trashCanActive from "../../images/trashCan.svg";
import trashCanInactive from "../../images/trashCan_grey.svg";
import heartActive from "../../images/heart_active.svg";
import CloseButton from "../../images/Close_Icon.svg";
import heart from "../../images/heart.svg";
import { clientApi, thisUser } from "../constants";

export default function Card(props) {
  // ------------------Variables-------------------------
  const myCardLikes = props.likes.some((like) => {
    return like._id === thisUser._id;
  });
  const [isThisCardLiked, setIsThisCardLiked] = React.useState(myCardLikes);
  const isThisMyCard = thisUser._id === props.owner._id;
  const [isPopupActive, setIsPopupActive] = React.useState(false);

  //  ------------------handleCardClick-------------------------
  function handleCardClick() {
    setIsPopupActive((prevState) => !prevState);
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("click", handleOverlayClick);

    function handleEsc(evt) {
      if (evt.key === "Escape") {
        setIsPopupActive(false);
        window.removeEventListener("keydown", handleEsc);
        window.removeEventListener("click", handleOverlayClick);
      }
    }

    function handleOverlayClick(evt) {
      if (evt.target.classList.contains("popupwithimage_active")) {
        setIsPopupActive(false);
        window.removeEventListener("click", handleOverlayClick);
        window.removeEventListener("keydown", handleEsc);
      }
    }
  }

  //  ------------------handleDeleteClick-------------------------
  const handleDeleteClick = async () => {
    await clientApi.removeCard(props._id);
  };

  //  ------------------handleLikeClick-------------------------
  async function handleLikeClick(evt) {
    const likeCounter = evt.target.parentElement.querySelector(".card__likes");

    if (!isThisCardLiked) {
      const response = await clientApi.sendLike(props._id);
      likeCounter.textContent = response.likes.length;
      setIsThisCardLiked((prevState) => !prevState);
    } else {
      const response = await clientApi.sendDislike(props._id);
      likeCounter.textContent = response.likes.length;
      setIsThisCardLiked((prevState) => !prevState);
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
          onClick={handleDeleteClick}
        >
          <img
            src={trashCanActive}
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
              src={isThisCardLiked ? heartActive : heart}
              alt="imagem de um coração vazado"
              className="like-button like-button_inactive"
              id="like_off"
              onClick={handleLikeClick}
            />
            <p className="card__likes">{props.likes.length}</p>
          </div>
        </div>
      </li>
    </>
  );
}
