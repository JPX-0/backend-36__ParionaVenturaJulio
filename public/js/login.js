// document.addEventListener('DOMContentLoaded', () => {
//   const elems = document.querySelectorAll('.datepicker');
//   // const elems = document.querySelectorAll('select');
//   const datepickerOptions = {
//     autoClose: true,
//     format: 'mmmm dd, yyyy',
//     yearRange: 50,
//   }
//   M.Datepicker.init(elems, datepickerOptions);
//   // M.FormSelect.init(elems, options);
//   // const instance = M.FormSelect.getInstance(elems);
//   // instance.getSelectedValues();
// });

const coverSignInBtn = document.getElementById('cover-sign-in-btn');
const coverSignUpBtn = document.getElementById('cover-sign-up-btn');

const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const formWindow = document.getElementById('form-window');
const formContent = document.getElementById('form-content');

coverSignInBtn.addEventListener('click', () => {
  signInForm.classList.remove('hide-form');
  signUpForm.classList.add('hide-form');

  formWindow.classList.remove('window-to-left-frame');
  formContent.classList.remove('content-to-right-frame');
  formWindow.classList.add('window-to-right-frame');
  formContent.classList.add('content-to-left-frame');
});

coverSignUpBtn.addEventListener('click', () => {
  signUpForm.classList.remove('hide-form');
  signInForm.classList.add('hide-form');

  formWindow.classList.remove('window-to-right-frame');
  formContent.classList.remove('content-to-left-frame');
  formWindow.classList.add('window-to-left-frame');
  formContent.classList.add('content-to-right-frame');
});

const searchInputLocation = document.querySelector("#searchInputLocation");
setTimeout(() => {
  const foundInputLocation = searchInputLocation.children[0].children[0];
  foundInputLocation.setAttribute("id", "location");
  foundInputLocation.setAttribute("name", "location");
}, 50);