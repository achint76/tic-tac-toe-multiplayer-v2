// document.getElementById('loginForm').addEventListener('submit', async (event) => {
//     event.preventDefault();
    
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         });

//         if (response.ok) {
//             const data = await response.json();
//             alert('Login successful!');
//             // Store the session information or token if needed
//             // For example, storing in localStorage
//             // localStorage.setItem('user', JSON.stringify(data.user));
//            // window.location.href = '../profile/index.html'; // Redirect to profile or home page
           
//            window.location.href = data.redirectTo;
//         } else {
//             const errorData = await response.json();
//             alert(`Login failed: ${errorData.message}`);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again later.');
//     }
// });




document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("email password received", email, password);
    try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("DATA", data);
        if (data.success) {
            console.log("DATA-DATA", data.data);
            localStorage.setItem('user', JSON.stringify(data.data));
            console.log(data.redirectTo,"REDIRECT");
            window.location.href = data.redirectTo;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
});
