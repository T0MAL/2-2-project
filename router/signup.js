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

router.post("/signup", async (req, res) => {
    let user = {
        playername: req.body.playername,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      };
    console.log(user.username);
    DB_auth.insertAccountIntoDB(user.playername,user.email,user.username,user.password)
    let resultss = await DB.allgames()
        res.render("login.ejs", {
        }
        
      );
      
  });

  router.get("/home",async (req, res) => {
    results = await DB.allgames()
    //console.log(results);
  res.render("homeafterlogin.ejs", {
    AllGames : results
  })
});

  module.exports = router;