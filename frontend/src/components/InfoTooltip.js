import React from "react";
import closeIcon from "../images/close.png";
import success from "../images/success.png";
import fail from "../images/fail.png";
function InfoTooltip({ onClose, isOpen, signedIn }) {
  const message = signedIn
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";
  const tooltip = signedIn ? success : fail;
  return (
    <div className={`popup  ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container popup__container_success">
        <img src={tooltip} className={`popup__success`} />
        <h2 className="popup__title">{message}</h2>
        <button type="button" className="popup__close" onClick={onClose}>
          <img
            onClick={onClose}
            src={closeIcon}
            alt="закрывающий крестик"
            className="popup__close-image"
          />
        </button>
      </div>
    </div>
  );
}
export default InfoTooltip;
