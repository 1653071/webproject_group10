const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db");

//Them watch list
router.post("/add", (req, res) => {
    (async () => {
        try {
            const check = db.collection("watchlist").where('state', '>=', 'CA').where('state', '<=', 'IN').get();
            if (check.empty) {
                const document = await db.collection("watchlist").add({
                    productId:req.body.productId,
                    userId : req.body.userId
                });
    
                return res.status(200).send("Add successful");
            }
            else{
                return res.status(400).send("Have in watch list");
            }  
            
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

//Xoa watchlist
router.delete("/delete/:id", (req, res) => {
    (async () => {
        try {
            const document = db.collection("watchlist").doc(req.params.id);
            await document.delete();
            return res.status(200).send("Deleted");
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

//Xem watch list theo user
router.get("/user/:id", (req, res) => {
    (async () => {
        try {
            let query = db.collection("watchlist");
            let response = [];
            await query.get().then((querySnapShot) => {
                let docs = querySnapShot.docs;
                for (let doc of docs) {
                    if(req.params.id === doc.data().userId) {
                        const selectedItem = {
                            userId : doc.data().userId,
                            productId :doc.data().productId
                        };
                        response.push(selectedItem);
                    }
                }
                return response;
            });
            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

module.exports = router;