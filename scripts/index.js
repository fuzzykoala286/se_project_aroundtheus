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
  //modal.classList.remove("modal_opened");
  setTimeout(() => {
    modal.classList.add("modal_hidden");
  }, 500);
}

function openPopup(modal) {
  modal.classList.remove("modal_hidden");
  modal.classList.add("modal_opened");
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

  closePopup(profileAddModal);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButtons = cardElement.querySelector(".card__like-button");
  likeButtons.addEventListener("click", () => {
    likeButtons.classList.toggle("card__like-button-active");
  });
  cardImageEl.addEventListener("click", () => {
    previewTitle.textContent = cardData.name;
    previewImage.src = cardData.link;
    cardImageEl.alt = cardData.name;
    openPopup(previewPictureModal);
  });

  const previewExitButton = document.querySelector("#exit-preview-button");
  const addExitButtton = document.querySelector("#exit-add-button");
  const editExitButtton = document.querySelector("#exit-edit-button");
  previewExitButton.addEventListener("click", () =>
    closePopup(previewPictureModal)
  );
  editExitButtton.addEventListener("click", () => closePopup(profileEditModal));
  addExitButtton.addEventListener("click", () => closePopup(profileAddModal));

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
});
profileEditButton.addEventListener("click", () => openPopup(profileEditModal));

closePopup(profileAddModal);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
