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
    
        let productToAdd = products.find(p => p.id == productId)

        let url = `http://localhost:8080/addToCart/?username=${username}&sessionId=${sessionId}&title=${productToAdd.title}&cost=${productToAdd.cost}`

        await fetch(url, initHeaders)
        .then(response => {
            if (response.status === 200) {
                totalCartItems += 1
                document.getElementById("totalCartItems").innerHTML = totalCartItems;
            } else {
                logOut()
                alert("Session expired. Please Sign In.")
            }
        })
        .catch(err => {
            console.log(err);
        })

    }
}
