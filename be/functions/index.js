const functions = require("firebase-functions");
const express = require("express");
const usersRouter = require("./route/users");
const productsRouter = require("./route/products");
const watchListRouter = require("./route/wactchList");
const authRouter = require("./route/auth");

const app = express();
const cors = require("cors");
app.use(cors({ origin: true }));

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/watchlist",watchListRouter);


exports.app = functions.https.onRequest(app);