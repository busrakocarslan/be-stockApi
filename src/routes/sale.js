"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/sale:

const sale = require('../controllers/sale')
const permissions = require('../middlewares/permissions')

// URL: /sales

router.route('/')
.get(permissions.isLogin, sale.list)
.post(permissions.isLogin, sale.create)

router.route('/:id')
.get(permissions.isLogin, sale.read)
.put(permissions.isLogin, sale.update)
.patch(permissions.isLogin, sale.update)
.delete(permissions.isLogin, sale.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router