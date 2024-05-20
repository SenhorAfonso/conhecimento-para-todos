/* eslint-disable */

// document.addEventListener('DOMContentLoaded', () => {
//   const showRegisterLink = document.getElementById('show-register');
//   const showLoginLink = document.getElementById('show-login');
//   const loginBox = document.getElementById('login-box');
//   const registerBox = document.getElementById('register-box');
//   const newPasswordInput = document.getElementById('newPassword');
//   const confirmPasswordInput = document.getElementById('confirmPassword');

//   showRegisterLink.addEventListener('click', (event) => {
//     event.preventDefault();
//     loginBox.style.display = 'none';
//     registerBox.style.display = 'block';
//   });

//   showLoginLink.addEventListener('click', (event) => {
//     event.preventDefault();
//     registerBox.style.display = 'none';
//     loginBox.style.display = 'block';
//   });

//   confirmPasswordInput.addEventListener('input', () => {
//     const newPassword = newPasswordInput.value;
//     const confirmPassword = confirmPasswordInput.value;

//     if (newPassword !== confirmPassword) {
//       confirmPasswordInput.setCustomValidity('As senhas não coincidem');
//     } else {
//       confirmPasswordInput.setCustomValidity('');
//     }
//   });
// });



function changeRegisterField() {
  const registerContainer = document.getElementById('make-register');
  const loginContainer = document.getElementById('make-login');

  if (registerContainer.style.display === 'none') {
    registerContainer.style.display = 'flex'
    loginContainer.style.display = 'none'
  } else {
    registerContainer.style.display = 'none'
    loginContainer.style.display = 'flex'
  }
}
