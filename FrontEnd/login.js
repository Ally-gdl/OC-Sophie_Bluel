
document.getElementById("login-form").addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    })

    .then(function(response) {
        if (response.ok) {
            return response.json(); 
        } else {
            
            document.getElementById("error-message").style.display = "block";
        }
    })

    .then(function(data) {

        if (data && data.token) {

            localStorage.setItem("token", data.token);

            window.location.href = "index.html";
        }
    })

    .catch(function(error) {
        console.error("Error during login:", error);
        document.getElementById("error-message").style.display = "block";
    });
});