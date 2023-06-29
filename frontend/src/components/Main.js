import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="аватар профиля"
        />
        <button
          className="profile__avatar-button"
          onClick={onEditAvatar}
          type="button"
        ></button>
        <div className="profile__info">
          <div className="profile__flex">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="poster">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}             
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
            })}
        </section>
    </main>
    
  );
}

export default Main;
