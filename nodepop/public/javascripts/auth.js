async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('jwtToken', data.token);
    showTemporaryMessage('Login successful!', 'success');
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } else {
    showTemporaryMessage('Login failed: ' + data.message, 'error');
  }
}

function showTemporaryMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 2000);
}
