require('uuid')
require('./users')
require('blueimp-md5')
//var md5 = require('blueimp-md5')
const CryptoJS = require('crypto-js')

// const decryptWithAES = (ciphertext) => {
//     const passphrase = '123';
//     const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
//     const originalText = bytes.toString(CryptoJS.enc.Utf8);
//     return originalText;
//   };

const express = require('express')
const path = require('path')
const { v4, NIL } = require('uuid')
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
const client = new MongoClient(uri,
    {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/category.html/login', async (req, res) => {

    console.log("POST");

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
        .finally(() => {
            client.close()
        })
    }

    res.send({"message": sessionId,
                "totalCartItems": totalCartItems})
})

app.post('/category.html/cart', async (req, res) => {

    let username = req.query.username
    let sessionId = req.query.sessionId
    let title = req.query.title
    let cost = req.query.cost

    let found = false;
    
    users.forEach(user => {
        if(user.username == username && user.sessionId == sessionId) {
            found = true;
        }
    })

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
        .finally(() => {
            console.log("close");
            client.close()
        })
    }

    res.send({"message": sessionId})
})


app.get('/cart', (req, res) => {
    let username = req.query.username
    let sessionId = req.query.sessionId;

    let found = false;

    users.forEach(user => {
        if(user.username == username && user.sessionId == sessionId) {
            found = true;
        }
    })

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

                let totalCost = String(cartItems.map(i => parseInt(i.cost * i.quantity))
                                        .reduce((a, b) => a + b, 0)) + ' €'

                let totalCartItems = cartItems.map(i => parseInt(i.quantity))
                                        .reduce((a, b) => a + b, 0)

                res.send({cartItems, totalCost, totalCartItems})
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                console.log("close");
                client.close()
            })
    }
})

app.get('/delete', (req, res) => {
    let username = req.query.username
        client
            .connect()
            .then(() => {
                const collection = client.db("wikiShop")
                        .collection("CartItems")

                let query = {username: username}
                return collection.deleteMany(query)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                console.log("close");
                client.close()
            })
})