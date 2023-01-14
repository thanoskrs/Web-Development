let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json')

let initHeaders = {
    method: "GET",
    headers: myHeaders
}

const url = "https://wiki-shop.onrender.com/categories"

window.addEventListener('load', async () => {
    let categories;
    await fetch(url, initHeaders)
    .then(response => response.json())
    .then(obj => {
        categories = obj
    })

    var templates = {}
    let categoriesTemplateScript = document.getElementById("categories-template")
    templates.categories = Handlebars.compile(categoriesTemplateScript.textContent)

    let content = templates.categories({
        array: categories
    })
    let div = document.getElementById("categories")

    div.innerHTML = content

    document.getElementById("loader").style.display = "none";
});