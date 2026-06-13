
function showInputError(formEl, inputEl, {inputErrorClass, errorClass}){
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
    console.log(errorMessageEl);
};

function hideInputError(formEl, inputEl, {inputErrorClass, errorClass}){
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = ``;
    errorMessageEl.classList.remove(errorClass);
};

function checkInputValidity(formEl, inputEl, options){
    if(inputEl.validity.valid){
       return hideInputError(formEl, inputEl, options);
    } 
        showInputError(formEl, inputEl, options);
    }


    function hasInvalidInput(inputList){

        return !inputList.every((inputEl => inputEl.validity.valid))

    };

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}){


    if(hasInvalidInput(inputEls)){
        return enableButton(submitButton,{inactiveButtonClass});
        
    }
    disableButton(submitButton,{inactiveButtonClass});
    
};

function enableButton(submitButton,{inactiveButtonClass}){
    submitButton.classList.add(inactiveButtonClass)
        return submitButton.disabled = true;
}

function disableButton(submitButton,{inactiveButtonClass}){
    submitButton.classList.remove(inactiveButtonClass)
    submitButton.disabled = false;   
}

function setEventListeners(formEl, options) {
 const {inputSelector} = options; 
 const inputEls = [...formEl.querySelectorAll(inputSelector)];
 const submitButton= formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
        checkInputValidity(formEl, inputEl, options);
        toggleButtonState(inputEls,submitButton,options );
    });
  })
    }

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
        });
 setEventListeners(formEl, options);

    });
}


const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
 }



enableValidation(config);
   
