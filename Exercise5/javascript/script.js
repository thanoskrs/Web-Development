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