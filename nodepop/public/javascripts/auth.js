async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/api/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('jwtToken', data.token);
    showTemporaryMessage(req.__('Login successful!'), 'success');
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } else {
    showTemporaryMessage(req.__(`errors.${data.message}`) || data.message, 'error');
  }
}

async function getProducts() {
  const token = localStorage.getItem('jwtToken');
  const response = await fetch('http://localhost:3000/api/products', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  const data = await response.json();
  if (response.ok) {
    console.log(data);
    document.getElementById('products').innerText = JSON.stringify(data, null, 2);
  } else {
    showTemporaryMessage('Error: ' + data.message, 'error');
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
