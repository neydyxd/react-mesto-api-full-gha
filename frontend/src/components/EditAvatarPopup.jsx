import React from "react";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button="Сохранить"
    >
      <input
        id="popup__link"
        className="popup__input popup__input_link"
        name="link"
        ref={avatarRef}
        placeholder="Ссылка на изображение"
        type="url"
        required
      />
      <span className="popup__input-error popup__link-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
