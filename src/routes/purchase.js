"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/purchase:

const purchase = require("../controllers/purchase");
const permissions = require("../middlewares/permissions");

// URL: /purchases

router
  .route("/")
  .get(permissions.isLogin, purchase.list)
  .post(permissions.isLogin, purchase.create);

router
  .route("/:id")
  .get(permissions.isLogin, purchase.read)
  .put(permissions.isLogin, purchase.update)
  .patch(permissions.isLogin, purchase.update)
  .delete(permissions.isLogin, purchase.delete);

/* ------------------------------------------------------- */
// Exports:
module.exports = router;
