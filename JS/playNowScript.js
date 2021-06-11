const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const gender = document.querySelector('.gender[name="gender"]');
const password = document.getElementById('password');
const terms = document.getElementById('terms');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const termsChecked = terms.checked;
  
  // VALIDATE NAME
  // Must be filled
  if (nameValue === "" || nameValue === null) {
    showError(name, "Name must be filled!");
  } else {
    showSuccess(name);
  }
  
  // Must longer than 3 characters
  if (nameValue.length < 3) {
    showError(name, "Name must be longer than 3 characters!")
  } 

  // Must Characters
  for (let i = 0; i < nameValue.length; i++) {
    if (!(nameValue[i] >= 'A' && nameValue[i] <= 'Z') &&
      !(nameValue[i] >= 'a' && nameValue[i] <= 'z')) {
      showError(name, "Name must be characters and can not numbers!");
    } else {
      showSuccess(name);
    }
  }

  // VALIDATE EMAIL
  // Must be filled
  if (emailValue === "" || emailValue === null) {
    showError(email, "Email must be filled!");
  } else {
    showSuccess(email);
  }

  // Invalid Email
  if (!isEmail(emailValue)) {
    showError(email, "Email is not valid!");
  } else {
    showSuccess(email);
  }

  // VALIDATE GENDER
  // Must be selected

  // VALIDATE PASSWORD
  // Must be filled
  if (passwordValue === "" || passwordValue === null) {
    showError(password, "Password must be filled!");
  } else {
    showSuccess(password);
  }

  // Longer than 5 characters
  if (passwordValue.length <= 5) {
    showError(password, "Password must be longer than 5 characters!");
  } else {
    showSuccess(password);
  }

  // VALIDATE TERMS CHECK
  if (termsChecked == false) {
    showError(terms, "You must agree with the terms and conditions!");
  } else {
    showSuccess(terms);
  }

});

function showError(input, messages) {
  const inputContainer = input.parentElement;
  const small = inputContainer.querySelector('small');
  small.innerText = messages;
  inputContainer.className = 'input-container error';
}

function showSuccess(input) {
  const inputContainer = input.parentElement;
  inputContainer.className = 'input-container success';
}

function isEmail(email) {
  const count = 0;
  for (let i = 0; i < email.length; i++) {
    if (email[i] === '@') {
      count = 1;
    }

    if (email[i] === '@' && email[i + 1] === '.') {
      return false;
    }
  }

  if (count == 0) {
    return false;
  }

  if (!email.endsWith(".com") && !email.endsWith(".co.id")) {
    return false;
  }
}
