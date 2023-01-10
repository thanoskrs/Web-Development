let myHeaders = new Headers();
myHeaders.append('Accept', 'application/json')

let initHeaders = {
    method: "GET",
    headers: myHeaders
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const category_id = urlParams.get('categoryid')

const url = "https://wiki-shop.onrender.com/categories/"
const products_url = url.concat(category_id).concat("/products")
const sub_categories_url = url.concat(category_id).concat("/subcategories")

var templates = {}

window.addEventListener('load', async () => {
    let products, sub_categories;

    await fetch(products_url, initHeaders)
    .then(response => response.json())
    .then(obj => {
        products = obj
    })

    await fetch(sub_categories_url, initHeaders)
    .then(response => response.json())
    .then(obj => {
        sub_categories = obj
    })

    updateContent("products-template", products, "product-list")
    updateContent("sub-categories-template", sub_categories, "sub-category-select")

    let select = document.getElementById("sub-category-select")
    select.onchange = function() {
        let subCategorySelected = parseInt(select.value)
        if (subCategorySelected === 0) {
            updateContent("products-template", products, "product-list")
        } else {
            updateContent("products-template", products.filter(obj => obj.subcategory_id === subCategorySelected), "product-list")
        }
    }
});

let updateContent = function(templateId, array, elementId) {
    let templateScript = document.getElementById(templateId)
    let templates = Handlebars.compile(templateScript.textContent)

    let content = templates({
        array: array
    }) 

    let element = document.getElementById(elementId)
    element.innerHTML = content
}

