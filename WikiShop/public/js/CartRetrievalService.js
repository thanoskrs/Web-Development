let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json')

let initHeaders = {
    method: "GET",
    headers: myHeaders
}

window.addEventListener('load', async () => {
    let username = localStorage.getItem("username")
    let sessionId = sessionStorage.getItem("sessionId")
    let info;
    let url = `http://localhost:8080/cart?username=${username}&sessionId=${sessionId}`

    await fetch(url, initHeaders)
        .then(response => response.json())
        .then(obj => {
            info = obj
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
});