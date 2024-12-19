
// Login Script
function Login() {
    var username = String(document.getElementById("usernameField").value);
    let email = document.getElementById("emailField").value;
    let password = document.getElementById("passField").value;
    let confPassword = document.getElementById("confPassField").value;
  
    let valid = true;
  
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confPassword);
  
  
    if (username.length < 2) {
      let userError = document.getElementById("usernameError");
      userError.innerHTML = "Invalid Username";
      valid = false;
    }
  
    if (email.length < 1) {
      let emailError = document.getElementById("emailError");
      emailError.innerHTML = "Invalid Email Format";
      valid = false;
    }
  
  
    if (password.length < 6) {
      let passError = document.getElementById("passError");
      passError.innerHTML = "Password should be more than 6 characters";
      valid = false;
    }
  
    if (password != confPassword) {
      let confPassError = document.getElementById("confPassError");
      confPassError.innerHTML = "The confirm password not equal the password";
      valid = false;
    }
  
  
    if (valid) {
      const d = new Date();
  d.setTime(d.getTime() + (3*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = "username=" + username + ";" + expires + ";path=/";
      window.location.href = "idx.html";
    }
  
  }
  