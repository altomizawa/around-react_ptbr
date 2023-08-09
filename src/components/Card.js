import React, { useContext } from "react";

import trashCanActive from "../images/trashCan.svg";
import trashCanInactive from "../images/trashCan_grey.svg";
import heartActive from "../images/heart_active.svg";
import heart from "../images/heart.svg";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  // ------------------Context-------------------------
  const currentUser = useContext(CurrentUserContext);

  // ------------------Variables-------------------------
  // const myCardLikes = props.card.likes.some((like) => {
  //   return like._id === currentUser._id;
  // });
  // const [isThisCardLiked, setIsThisCardLiked] = React.useState(myCardLikes);
  const isThisMyCard = currentUser._id === props.owner._id;
  const isLiked = props.likes.some((i) => i._id === currentUser._id);

  //  ------------------handleLikeClick-------------------------
  // async function handleLikeClick(evt) {
  //   const likeCounter = evt.target.parentElement.querySelector(".card__likes");

  //   // if (!isThisCardLiked) {
  //   //   props.handleCardLike(props._id, likeCounter);
  //   //   setIsThisCardLiked((prevState) => !prevState);
  //   // } else {
  //   //   props.handleCardDislike(props._id, likeCounter);
  //   //   setIsThisCardLiked((prevState) => !prevState);
  //   // }
  // }

  //-----------------------Return JSX--------------------
  return (
    <>
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
          // onClick={handleCardClick}
          onClick={() => props.onCardClick(props.card)}
        />
        <div className="card__description-wrapper">
          <h4 className="card__title">{props.name}</h4>
          <div className="card__like-wrapper">
            <img
              src={isLiked ? heartActive : heart}
              alt="imagem de um coração vazado"
              className="like-button like-button_inactive"
              id="like_off"
              onClick={() => {
                props.onCardLike(props);
              }}
            />
            <p className="card__likes">{props.likes.length}</p>
          </div>
        </div>
      </li>
    </>
  );
}
