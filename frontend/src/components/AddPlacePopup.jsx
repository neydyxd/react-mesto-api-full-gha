import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button="Создать"
      name="add"
    >
      <input
        id="popup__poster"
        value={name}
        onChange={handleNameChange}
        className="popup__input popup__input_title"
        name="add"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error popup__poster-error"></span>
      <input
        id="popup__url"
        value={link}
        onChange={handleLinkChange}
        className="popup__input popup__input_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error popup__url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
