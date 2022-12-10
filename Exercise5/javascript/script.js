var check_password = function() {
    if (document.getElementById('txt_password').value ==
      document.getElementById('txt_cpassword').value) {
      document.getElementById('message').style.color = 'green'; //χρωμα επιτυχιας
      document.getElementById('message').innerHTML = 'matching passwords';
    } else {
      document.getElementById('message').style.color = 'red';//χρωμα αποτυχιας
      document.getElementById('message').innerHTML = 'not matching passwords';
    }
  }

  function date_check() {
    const input = document.getElementById("birthday_date");
    if (!input.checkValidity()) {
      document.getElementById("date_error").innerHTML = input.validationMessage;
      document.getElementById('date_error').style.color = 'red';
    }
    else {
        document.getElementById("date_error").innerHTML = "Input OK";
        document.getElementById('date_error').style.color = 'green';
      } 
  }

  function email_check() {
    const input = document.getElementById("txt_email");
    console.log(input.value)
    if (!input.checkValidity()) {
      document.getElementById("email_error").innerHTML = input.validationMessage;
      document.getElementById('email_error').style.color = 'red';
    }
    else {
        document.getElementById("email_error").innerHTML = "Input OK";
        document.getElementById('email_error').style.color = 'green';
      } 
  }

  function phone_check() {
    const input = document.getElementById("txt_telephone");
    if (!input.checkValidity()) {
      document.getElementById("phone_error").innerHTML = input.validationMessage;
      document.getElementById('phone_error').style.color = 'red';
    }
    else {
        document.getElementById("phone_error").innerHTML = "Input OK";
        document.getElementById('phone_error').style.color = 'green';
      } 
  }

window.onload = function() {

  let birthdayDateElement = document.getElementById("birthday_date")
  
  birthdayDateElement.onchange = function() {
    let birthdayDate = new Date(birthdayDateElement.value)
    let today = new Date()
    let valid = (today.getFullYear() - birthdayDate.getFullYear()) >= 18

    if (!valid) {
      birthdayDateElement.setCustomValidity("Your age should be at least 18 years.")
    } else {
      this.setCustomValidity("")
    }
  }


  let passwordElement = document.getElementById("txt_password")
  passwordElement.onchange = function() {
    let passwordText = document.getElementById("txt_password").value

    const specialCharacters = /[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/
    const numbers = /[0-9]/
    const upperCaseLetters = /[A-Z]/

    if (!specialCharacters.test(passwordText)) {
      document.getElementById("txt_password").setCustomValidity("The password should contain at least one special character.")
    }  else if (!numbers.test(passwordText)) {
      document.getElementById("txt_password").setCustomValidity("Password should contain at least one number.")
    } else if (!upperCaseLetters.test(passwordText)) {
      document.getElementById("txt_password").setCustomValidity("Password should contain at least one upper case letter.")
    } else {
      this.setCustomValidity("")
    }
  }
}



