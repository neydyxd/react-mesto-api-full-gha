import React from "react";
import deleteIcon from "../images/delete.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `poster__like-button ${
    isLiked && "poster__like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="poster__item">
      {isOwn && (
        <img
          className="poster__delete-button"
          onClick={handleDeleteClick}
          src={deleteIcon}
          alt="кнопка удаления "
        />
      )}
      <button
        type="button"
        className="poster__photo-button"
        onClick={handleClick}
      >
        <img className="poster__photo" src={card.link} alt={card.name} />
      </button>
      <div className="poster__info">
        <h2 className="poster__title">{card.name}</h2>
        <div className="poster__like-group">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="poster__like-number">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
