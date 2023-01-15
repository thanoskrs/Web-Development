let username = localStorage.getItem("username")
let sessionId = sessionStorage.getItem("sessionId")

let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json')

let initHeaders = {
    method: "GET",
    headers: myHeaders
}

window.addEventListener('load',updateCart());

async function removeItem(title) {
    if(sessionId !== null || sessionId !== "null") {
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
    
        let initHeaders = {
            method: "POST",
            headers: myHeaders
        }
    
        let url = `http://localhost:8080/removeFromCart/?username=${username}&sessionId=${sessionId}&title=${title}`
    
        await fetch(url, initHeaders)
        .catch(err => {
            console.log(err);
        })
    }
    updateCart()
}

async function addItem(title) {
    if(sessionId !== null || sessionId !== "null") {
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
    
        let initHeaders = {
            method: "POST",
            headers: myHeaders
        }
    
        let url = `http://localhost:8080/addToCart/?username=${username}&sessionId=${sessionId}&title=${title}`
    
        await fetch(url, initHeaders)
        .catch(err => {
            console.log(err);
        })
    }

    updateCart()
}

async function updateCart() {
    let info;
    let url = `http://localhost:8080/cart?username=${username}&sessionId=${sessionId}`

    await fetch(url, initHeaders)
        .then(response => response.json())
        .then(obj => {
            info = obj
        })
        .catch(err => {
            console.log(err);
        })

    var templates = {}
    let cartItemsTemplateScript = document.getElementById("cart-items-table-template")
    templates.info = Handlebars.compile(cartItemsTemplateScript.textContent)

    let content = templates.info({
        array: info
    })
    let table = document.getElementById("cart-table")

    table.innerHTML = content

    document.getElementById("loader").style.display = "none";
    if(info.totalCartItems == 0) {
        document.getElementById("cart-error").innerHTML = "No products have been added to cart."
        document.getElementById("cart-error").style.color = "red"
        document.getElementById("cart-table").deleteTFoot();
    }
}

async function clearCart() {
    let url = `http://localhost:8080/clearCart?username=${username}&sessionId=${sessionId}`

    await fetch(url, initHeaders)
    .catch(err => {
        console.log(err);
    })

    updateCart()
}