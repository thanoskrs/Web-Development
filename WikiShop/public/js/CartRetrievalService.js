
let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json')

let initHeaders = {
    method: "GET",
    headers: myHeaders
}

window.addEventListener('load', async () => {
    let username = localStorage.getItem("username")
    let sessionId = sessionStorage.getItem("sessionId")
    let cartItems;
    let url = `http://localhost:8080/cart?username=${username}&sessionId=${sessionId}`

    await fetch(url, initHeaders)
        .then(response => response.json())
        .then(obj => {
            cartItems = obj.cartItems
            console.log(cartItems);
        })

    var templates = {}
    let cartItemsTemplateScript = document.getElementById("cart-items-table-template")
    templates.cartItems = Handlebars.compile(cartItemsTemplateScript.textContent)

    let content = templates.cartItems({
        array: cartItems
    })
    let table = document.getElementById("cart-table")

    table.innerHTML = content
});