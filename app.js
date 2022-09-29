const submitButton = document.querySelector(".submit");
const resumeButton = document.querySelector(".continue");
const form = document.querySelector("form");
const formArea = document.querySelector(".form-area");
const viewArea = document.querySelector(".view-area");
const completed = document.querySelector(".completed");

const cardNumber = document.querySelector(".card-front_numbers");
const cardName = document.querySelector(".card-front_name");
const cardExpiryDate = document.querySelector(".card-front_date");
const cardCvc = document.querySelector(".card-back_numbers");

// Inputs
const holderNameInput = document.querySelector("#cardholder-name");
const numberInput = document.querySelector("#card-number");
const expiryDateInput = document.querySelector("#card-expiry-date");
const cvcInput = document.querySelector("#card-cvc");

const inputArray = [holderNameInput, numberInput, expiryDateInput, cvcInput];

let complete = false;
let noError = true;

let formData = {
  cardHolderName: "Jane Appleseed",
  cardNumber: "0000 0000 0000 0000",
  cardExpiryDate: "00/00",
  cardCvc: "000",
};

// Initializing
resetData();

console.log(holderNameInput);
viewArea.removeChild(completed);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    if (!complete) {
      complete = true;
      formArea.removeChild(form);
      formArea.appendChild(completed);
      console.log("Done");
      console.log(complete);
    }
  } else {
    alert("Errors.");
  }
});

resumeButton.addEventListener("click", (e) => {
  if (complete) {
    complete = false;
    formArea.removeChild(completed);
    formArea.appendChild(form);

    resetData();
  }
});
function handleChange(event) {
  formData = {
    ...formData,
    [event.target.name]: event.target.value,
  };

  inputArray.forEach((input) => {
    if (!input.checkValidity()) {
      const errorDiv = input.parentElement.children[2];
      if (input.validity.valueMissing) {
        errorDiv.innerHTML = "Can't be missing";
      } else if (input.validity.patternMismatch) {
        switch (input.name) {
          case "cardNumber":
            if (input.value.match("[^0-9 ]") != null) {
              errorDiv.innerHTML = "Wrong format, numbers only.";
            } else {
              errorDiv.innerHTML = "Required format: XXXX XXXX XXXX XXXX";
            }
            break;
          case "cardCvc":
            if (input.value.match("[^0-9 ]") != null) {
              errorDiv.innerHTML = "Wrong format, numbers only.";
            } else {
              errorDiv.innerHTML = "Required format: XXX";
            }
            break;
        }
      } else {
        errorDiv.innerHTML = input.validationMessage;
      }

      console.log(`${input.name} : ${input.validationMessage}`);
    } else {
      input.parentElement.children[2].innerHTML = "";
    }
  });

  setValues();
}

// Set up the oninput event listener
inputArray.forEach((input) => {
  input.oninput = handleChange;
});

function setValues() {
  cardName.innerHTML = formData.cardHolderName;
  cardNumber.innerHTML = formData.cardNumber;
  cardExpiryDate.innerHTML = formData.cardExpiryDate;
  cardCvc.innerHTML = formData.cardCvc;
}

function resetData() {
  formData = {
    cardHolderName: "Jane Appleseed",
    cardNumber: "0000 0000 0000 0000",
    cardExpiryDate: "00/00",
    cardCvc: "000",
  };

  inputArray.forEach((input) => {
    input.value = "";
  });

  setValues();
}
