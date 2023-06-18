import close from "../images/close.png";
function ImagePopup(props) {
  const popupClass = `popup popup_type_image ${
    props.isOpen ? "popup_opened" : ""
  }`;
  return (
    <div className={popupClass} onClick={() => props.onClose(false)}>
      <div className="popup__container popup-photo__container">
        <button className="popup-photo__close popup__close" type="button">
          {" "}
          <img
            className="popup-photo__close-image"
            src={close}
            alt="кнопка закрытия формы"
          />
        </button>
        <img
          className="popup-photo__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={(e) => e.stopPropagation()}
        />
        <p className="popup-photo__subtitle">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
