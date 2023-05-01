const { doc } = require("prettier");

const loginFormHandler = async (event) => {
    event.preventDefault();

    const usernameInput = document.querySelector('#username-input');
    const passwordInput = document.querySelector('#password-input');


    // send a POST request to the server with the user's credentials
    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value 
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        // if login is usccessfu, redirect to the dashboard page
        document.location.replace('/views/dashboard');
    } else {
        // if login fails, display error
        const errorMessage = await response.text();
        const errorAlert = document.querySelector('#error-alert');
        errorAlert.textContent = errorMessage;
        errorAlert.classList.remove('d-none');
    }
};


const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-input');
    const usernameInput = document.querySelector('#username-input');
    const passwordInput = document.querySelector('#password-input');;
  
    if (name && username && password) {
      const response = await fetch('/controllers/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/views/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  



document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);