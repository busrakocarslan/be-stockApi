"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/document:

// URL: /documents

router.all('/', (req, res) => {
    res.send({
        swagger: "/documents/swagger",
        redoc: "/documents/redoc",
        json: "/documents/json",
    })
})

// JSON://controller,
router.use('/json', (req, res) => {
    res.sendFile(`/src/configs/swagger.json`, { root: '.' })
})

// Redoc:
const redoc = require('redoc-express')
router.use('/redoc', redoc({ specUrl: '/documents/json', title: 'API Docs' }))

// Swagger:
const swaggerUi = require('swagger-ui-express')
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(require('../configs/swagger.json'), { swaggerOptions: { persistAuthorization: true } }))// bu son ayara dokuman da sağda görünen  autoriza dA tokenin  hafizada kalması için yazılıyor. 

/* ------------------------------------------------------- */
module.exports = router