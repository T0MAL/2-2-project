const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB_auth = require("../database/dbauthapi");
 const DB = require("../database/dbHome");
// const DB_Seller = require("../Database/DB-seller-api");
const { count } = require("console");


//let person_id;
//let USER_NAME = null;

router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});



  router.get("/home",async (req, res) => {
    results = await DB.allgames()
    //console.log(results);
  res.render("homeafterlogin.ejs", {
    AllGames : results
  })
});

  module.exports = router;