document.addEventListener('DOMContentLoaded', () => {
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  showRegisterLink.addEventListener('click', (event) => {
    event.preventDefault();
    loginBox.style.display = 'none';
    registerBox.style.display = 'block';
  });

  showLoginLink.addEventListener('click', (event) => {
    event.preventDefault();
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
  });

  confirmPasswordInput.addEventListener('input', () => {
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword !== confirmPassword) {
      confirmPasswordInput.setCustomValidity('As senhas não coincidem');
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  });
});
