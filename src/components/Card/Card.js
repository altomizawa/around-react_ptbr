import React from "react";

import trashCanActive from "../../images/trashCan.svg";
import trashCanInactive from "../../images/trashCan_grey.svg";
import heartActive from "../../images/heart_active.svg";
import heart from "../../images/heart.svg";
import { clientApi, thisUser } from "../constants";
import ImagePopUp from "../ImagePopup";



export default function Card(props) {
  // ------------------Variables-------------------------
  const myCardLikes = props.likes.some((like) => {
    return like._id === thisUser._id;
  });
  const [isThisCardLiked, setIsThisCardLiked] = React.useState(myCardLikes);
  const isThisMyCard = thisUser._id === props.owner._id;

  //  ------------------CardClick-------------------------
  const[cardState, setCardstate] = React.useState(false)
  function handleCardClick() {
    console.log(props.card)
    setCardstate(true)
  }
  

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
      <ImagePopUp card={props.card} onClose={props.onClose}
      isActive={cardState}
      onClose={() => setCardstate(false)} 
      />
      <li className="card" id="">
        <button
          className="card__delete-button"
          style={{ display: isThisMyCard ? "block" : "none" }}
          onClick={() => props.handleCardDelete(props._id)}
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
