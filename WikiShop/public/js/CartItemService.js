async function addToCart(productId) {

    if(sessionId === null || sessionId === "null") {
        openForm()
    } else {
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
    
        let initHeaders = {
            method: "POST",
            headers: myHeaders
        }
    
        let url = `http://localhost:8080/category.html/cart/?username=${username}&productId=${productId}&sessionId=${sessionId}`
    
        await fetch(url, initHeaders)
        .then(response => response.json())
        .then(obj => {
            sessionId = obj.message
        })
    }
}