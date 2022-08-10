const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB_auth = require("../database/dbauthapi");
 const DB = require("../database/dbHome");
// const DB_Seller = require("../Database/DB-seller-api");
const { count } = require("console");


//let person_id;
//let USER_NAME = null;

router.get("/", (req, res) => {
  res.render("login.ejs");
});

router.post("/homeafterlogin", async (req, res) => {

    // let user = JSON.parse(req.body.user_info);
  
    // if (user !== null) {
  
    //   let categories;
    //   return res.render("homeafterlogin.ejs", {
    //     value: categories,
    //     user: user
    //   });
  
    // }
    
  
      let username = req.body.username;
      let password = req.body.password;
      let gg=req.body.from;
      console.log(password);
  
  
      let results;
  
      results = await DB_auth.getPassfromDB(username)

      let pass_db
      if(results.length>0){
        pass_db = results[0].PWD;
      }
      
      //console.log(pass_db);
      let resultss = await DB.allgames()
      if (password === pass_db) {
        res.render("homeafterlogin.ejs", {
          AllGames : resultss
        }
        
      );
      
      }
      else {
        return res.redirect("/");
      }
  });

  router.get("/signup", async (req, res) => {
    res.render("signup.ejs");
  });

  module.exports = router;