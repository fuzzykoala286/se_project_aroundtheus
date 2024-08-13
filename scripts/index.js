const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

console.log(initialCards);

//constants
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-Edit-Modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector(".modal__input_type_url");
const addCardFormElement = document.querySelector("#add-card-form");
const profileAddModal = document.querySelector("#profile-Add-Modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileExitButton = document.querySelector("#profile-exit-button");
const cardListEl = document.querySelector(".cards__list");
const profileEditExitButton = document.querySelector(
  "#profile-edit-exit-button"
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//functions
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}
function closeEditPopup() {
  profileAddModal.classList.remove("modal_opened");
}
function openPopup() {
  profileEditModal.classList.add(".modal_opened");
}
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}
const previewPictureModal = document.querySelector("#picture-Modal");
const previewImage = previewPictureModal.querySelector(".modal__image");
const previewTitle = previewPictureModal.querySelector(".modal__title");
function openPictureModal() {
  previewImage.src = cardImageEl.link;
  previewImage.alt = cardData.name;
  previewTitle.textContent = cardData.name;
  return;
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });

  cardListEl.prepend(cardElement);
  closeEditPopup();
}
const modalExitButton = document.querySelector("#exit-modal-button");
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    previewTitle.textContent = cardData.name;
    previewImage.src = cardData.link;
    cardImageEl.alt = cardData.name;
    previewPictureModal.classList.add("modal_opened");
    modalExitButton.addEventListener("click", () => {
      previewPictureModal.classList.remove("modal_opened");
    });
  });
  //=> {

  // });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove(cardTemplate);
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

addCardFormElement.addEventListener("submit", handleProfileAddSubmit);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescription.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileExitButton.addEventListener("click", closePopup);
profileEditExitButton.addEventListener("click", closeEditPopup);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  profileAddModal.classList.add("modal_opened");
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

const likeButtons = document.querySelectorAll(".card__like-button");

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-active");
  });
});
