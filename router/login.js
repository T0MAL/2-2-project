const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB_auth = require("../database/dbauthapi");
 const DB = require("../database/dbHome");
// const DB_Seller = require("../Database/DB-seller-api");
const { count } = require("console");
let alert = require('alert'); 


//let person_id;
//let USER_NAME = null;

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/home", async (req, res) => {
      let username = req.body.username;
      let password = req.body.password;
      let results;
      results = await DB_auth.getPassfromDB(username)
      let pass_db
      if(results.length>0){
        pass_db = results[0].PWD;
      }
      let resultss = await DB.allgames()
      if (password === pass_db) {
        res.render("homeafterlogin.ejs", {
          AllGames : resultss,
          username : username
        }
        
      );
      
      }
      else {
        return res.redirect("/login");
      }
  });

  router.get("/signup", async (req, res) => {
    res.render("signup.ejs");
  });

  

  router.post("/signup", async (req, res) => {
    let user = {
        playername: req.body.playername,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      };
      results = await DB_auth.getPassfromDB(user.username)
      if(results.length>0){
        alert("USER ALREADY EXISTS")
        res.render("signup.ejs", {
        }
        
      ); 
      }
      else{
        DB_auth.insertAccountIntoDB(user.playername,user.email,user.username,user.password)
        res.render("login.ejs", {
        }
        
      );  
      }
    
  });

  module.exports = router;