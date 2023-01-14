require('uuid')
require('./users')

const express = require('express')
const path = require('path')
const { v4 } = require('uuid')
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const options = {
    root: path.join(__dirname, 'public')
}

// initialize mongoDb connection
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://wikiShop:wikiShopProject@cluster0.bbjrdwz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/category.html/login', async (req, res) => {
    let username = req.query.username
    let password = req.query.password
    
    let found = false;
    let sessionId = null;
    let totalCartItems = 0;

    users.forEach(user => {
        if(user.username == username && user.password == password) {
            found = true;
            sessionId = v4()
            user.sessionId = sessionId
        }
    })

    if(found) {
        totalCartItems = await getCartItems(username);
    }

    res.send({"message": sessionId,
                "totalCartItems": totalCartItems})
})

app.post('/addToCart', async (req, res) => {

    let username = req.query.username
    let sessionId = req.query.sessionId
    let title = req.query.title
    let cost = req.query.cost

    let found = searchUser(username, sessionId);

    var collection, query;

    if(found) {
        await client
        .connect()
        .then(() => {
            collection = client.db("wikiShop")
                    .collection("CartItems")

            query = {username: username, title: title}
            return collection.findOne(query)
        })
        .then(cartItem => {
            if(cartItem == null) {
                let item = {
                    username: username,
                    title: title,
                    quantity: 1,
                    cost: cost
                }
                return collection.insertOne(item)
            } else {
                let update = {
                    $set: {
                        quantity: cartItem.quantity + 1
                    }
                }
                return collection.updateOne(query, update)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (found) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }

})

app.post('/removeFromCart', async (req, res) => {

    let username = req.query.username
    let sessionId = req.query.sessionId
    let title = req.query.title

    let found = searchUser(username, sessionId);

    var collection, query;

    if(found) {
        await client
        .connect()
        .then(() => {
            collection = client.db("wikiShop")
                    .collection("CartItems")

            query = {username: username, title: title}
            return collection.findOne(query)
        })
        .then(cartItem => {
            if(cartItem != null) {
                if(cartItem.quantity > 1) {
                    let update = {
                        $set: {
                            quantity: cartItem.quantity - 1
                        }
                    }
                    return collection.updateOne(query, update)
                } else {
                    return collection.deleteOne(query)
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (found) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }

})

app.get('/cart', (req, res) => {
    let username = req.query.username
    let sessionId = req.query.sessionId;

    let found = searchUser(username, sessionId);

    if(found) {
        client
            .connect()
            .then(() => {
                const collection = client.db("wikiShop")
                        .collection("CartItems")

                let query = {username: username}
                return collection.find(query).toArray()
            })
            .then(cartItems =>{
                cartItems.forEach(item => {
                    delete item._id;
                    delete item.username;
                })

                let totalCost = '€ ' + String(cartItems.map(i => parseInt(i.cost * i.quantity))
                                        .reduce((a, b) => a + b, 0))

                let totalCartItems = cartItems.map(i => parseInt(i.quantity))
                                        .reduce((a, b) => a + b, 0)

                res.send({cartItems, totalCost, totalCartItems})
            })
            .catch(err => {
                console.log(err);
            })
    }
})

app.get('/clearCart', (req, res) => {
    let username = req.query.username
    let sessionId = req.query.sessionId;

    let found = searchUser(username, sessionId);

    if(found) {
        client
            .connect()
            .then(() => {
                const collection = client.db("wikiShop")
                        .collection("CartItems")

                let query = {username: username}
                console.log("dle")
                return collection.deleteMany(query)
            })
            .catch(err => {
                console.log(err);
            })
    }
    res.sendStatus(200)
})

app.get("/getTotalCartItems", async (req, res) => {
    let username = req.query.username
    let sessionId = req.query.sessionId

    let found = searchUser(username, sessionId);
    let totalCartItems = 0;

    if(found) {
        totalCartItems = await getCartItems(username);
    }

    res.send({"totalCartItems": totalCartItems})
})

function searchUser(username, sessionId) {
    let found = false;
    users.forEach(user => {
        if(user.username == username && user.sessionId == sessionId) {
            found = true;
        }
    })
    return found;
}

async function getCartItems(username) {
    let totalCartItems = 0
    await client
        .connect()
        .then(() => {
            collection = client.db("wikiShop")
                    .collection("CartItems")

            query = {username: username}
            return collection.find(query).toArray()
        })
        .then(cartItems => {
            if(cartItems !== null) {
                totalCartItems = cartItems
                                        .map(cartItem => parseInt(cartItem.quantity))
                                        .reduce((a, b) =>  a + b, 0)
            }
        })
        .catch(err => {
            console.log(err);
        })

    return totalCartItems
}