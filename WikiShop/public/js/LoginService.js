let username;
let sessionId;
let totalCartItems = 0;

var perfEntries = performance.getEntriesByType("navigation");

if (perfEntries[0].type === "back_forward") {
    location.reload(true);
}

window.onload = async function() {
    username = localStorage.getItem("username")
    sessionId = sessionStorage.getItem('sessionId')
    openOrCloseForm()

    let url = `http://localhost:8080/getTotalCartItems?username=${username}&sessionId=${sessionId}`

    await fetch(url, initHeaders)
    .then(response => response.json())
    .then(obj => {
        totalCartItems = obj.totalCartItems
    })
    showCartOrNo()
}

function openForm() {
    document.getElementById("login-div").style.display = "block";
    document.getElementById("invalid_data").innerHTML = ""
    var elements = document.getElementsByClassName("background")
    Array.prototype.forEach.call(elements, function(el) {
        el.style.opacity = 0.05;
    });
}
  
function closeForm() {
    document.getElementById("login-div").style.display = "none";
    document.getElementById("sign-up-div").style.display = "none";
    var elements = document.getElementsByClassName("background")
    Array.prototype.forEach.call(elements, function(el) {
        el.style.opacity = 1;
    });
}

function logOut() {
    username = null;
    sessionId = null;
    openOrCloseForm()
    showCartOrNo()
}

async function sendData() {

    username = document.getElementById("username").value
    let password = document.getElementById("password").value

    var hashed = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    var data = {
        hashed: Array.from(new Uint8Array(hashed)),
        username: username
    };

    let url = `http://localhost:8080/login`

    await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(obj => {
        sessionId = obj.message
        totalCartItems = obj.totalCartItems
        openOrCloseForm()
    })

    document.getElementById("loader").style.display = "none"

    if(sessionId === null) {
        document.getElementById("invalid_data").innerHTML = "Invalid username or password"
    }

    document.getElementById("login-form").reset();
    showCartOrNo()
}

function openOrCloseForm() {
    if(sessionId === null || sessionId === "null") {
        document.getElementById("log-out").style.display = "none";
        document.getElementById("open-button").style.display = "block";
    } else {
        closeForm()
        document.getElementById("open-button").style.display = "none";
        document.getElementById("log-out").style.display = "block";
    }
}

window.onbeforeunload = function() {
    localStorage.setItem("username", username)
    localStorage.setItem("products", JSON.stringify(products))
    sessionStorage.setItem("sessionId", sessionId)
}

function showCartOrNo() {
    let cartElement = document.getElementById("cart-container")
    document.getElementById("totalCartItems").innerHTML = totalCartItems;
    if(sessionId === null || sessionId === "null") {
        cartElement.style.display = "none"
    } else {
        cartElement.style.display = "flex"
    }
}

function openSignUp() {
    document.getElementById("login-div").style.display="none"
    document.getElementById("sign-up-div").style.display="block"
}

async function signUp() {
    username = document.getElementById("sign-up-username").value
    let password = document.getElementById("sign-up-password").value

    var hashed = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    var data = {
        hashed: Array.from(new Uint8Array(hashed)),
        username: username
    };

    let url = `http://localhost:8080/signup`

    await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(obj => {
        sessionId = obj.message
        totalCartItems = obj.totalCartItems
    })

    if(sessionId == null) {
        document.getElementById("user-exists").innerHTML = "Username already exists."
    } 

    openOrCloseForm()
    showCartOrNo()
}