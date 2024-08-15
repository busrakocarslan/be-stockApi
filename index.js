/*
"use strict";
/* -------------------------------------------------------
    | STOCK-APİ | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ npm i nodemailer
    $ npm i multer
    $ mkdir logs
    $ nodemon
    $ npm i cookie-session
    $ npm i jsonwebtoken
    
*/
///expressi bağlama 
const express= require("express")
const app=express()

//dotenv bağlama 
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

//hata yakalama modulu require et - asyncErrors to errorHandler:
require('express-async-errors')

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
//? Middlewares:

// Accept JSON:
app.use(express.json());

// Call static uploadFile:
app.use('/upload', express.static('./upload'))

// Check Authentication:
app.use(require('./src/middlewares/authentication'))

// Run Logger:
app.use(require('./src/middlewares/logger'))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))



/* ------------------------------------------------------- */

app.all("/", (req, res) => {
    res.send({
      error: false,
      message: "Welcome to STOCK API",
      docs: {
        swagger: "/documents/swagger",
        redoc: "/documents/redoc",
        json: "/documents/json",
      },
      user: req.user,
    });
  });



// Routes:
app.use(require('./src/routes'))




// hata yakalayacak olan middlevare i en sona yaz errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));