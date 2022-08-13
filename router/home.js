const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB = require("../database/dbHome");
const { count } = require("console");


//let person_id;
//let USER_NAME = null;

router.get("/",async (req, res) => {
    results = await DB.allgames()
    //console.log(results);
    let username = "Not logged in"
  res.render("homeafterlogin.ejs", {
    AllGames : results,
    username : username
  })
});

  router.get("/login", (req, res) => {
    res.render("login.ejs");
  });

  router.get("/signup", async (req, res) => {
    res.render("signup.ejs");
  });

  router.post("/profile", async (req, res) => {
    let username = req.body.username;
   // console.log(username)
    let user= await DB.playeDetails(username)
    console.log(user)
    res.render("profile.ejs",{
      user : user
    })
  });

  module.exports = router;