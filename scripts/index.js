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
  "#add-profile-description-input"
);
const cardTitleInput = document.querySelector(".modal__input_type-title");
const cardUrlInput = document.querySelector(".modal__input_type-url");
const addCardFormElement = document.querySelector("#add-card-form");
const profileAddModal = document.querySelector("#profile-Add-Modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//functions
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profileEditModal);
  profileTitleInput.value = "";
  profileDescriptionInput.value = "";
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

  closePopup(profileAddModal);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-active");
  });
  cardImageEl.addEventListener("click", () => {
    previewTitle.textContent = cardData.name;
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    openPopup(previewPictureModal);
  });

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
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
const exitButtons = document.querySelectorAll(".modal__close");

exitButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
