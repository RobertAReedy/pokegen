async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (password.length < 4) {
        alert('Please enter a password with at least 4 characters');
        return;
    }

    if (!username) {
        alert('Please enter a username');
        return;
    }

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const duplicateUsername = await response.json();
    
        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/');
        } else {
            alert(duplicateUsername.message);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch(`/api/users/login`, {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const loginResponse = await response.json();

        // check the response status
        if (response.ok) {
            document.location.replace('/');
        } else if (loginResponse.message1) {
            alert(loginResponse.message1);
        } else if (loginResponse.message2) {
            alert(loginResponse.message2);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
