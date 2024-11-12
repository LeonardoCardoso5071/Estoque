function validateForm(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (!email.includes('@')) {
        errorMessage.textContent = "O email deve conter um '@'";
        return false;
    }
 
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
        errorMessage.textContent = "A senha deve conter pelo menos um número, um caractere especial e 8 caracteres";
        return false;
    }

    errorMessage.textContent = '';

    console.log("Redirecionando para cadastro...");
    setTimeout(() => window.location.href = "./Cadastro/cadastro.html", 100);
    return true;
}

