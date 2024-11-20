document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Registration successful! Please log in.');
            //window.location.href = '../login/index.html';
            window.location.href = 'http://127.0.0.1:5000/login/index.html';
        } else {
            const errorData = await response.json();
            alert(`Registration failed: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
