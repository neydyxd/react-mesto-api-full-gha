import close from "../images/close.png";
import { useEffect } from "react";
function PopupWithForm({
  name,
  title,
  button,
  isOpen,
  children,
  onSubmit,
  onClose,
}) {
  const popupClass = `popup  popup_type_${name} ${
    isOpen ? "popup_opened" : ""
  }`;
  return (
    <div className={popupClass}>
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button onClick={onClose} className="popup__close" type="button">
          {" "}
          <img
            className="popup__close-image"
            src={close}
            alt="кнопка закрытия формы"
          />
        </button>
        <form
          onSubmit={onSubmit}
          name={name}
          className={`popup__form popup__form_${name}`}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save popup__save_edit" type="submit">
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
