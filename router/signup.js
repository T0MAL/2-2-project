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

router.post("/homeafterlogin", async (req, res) => {

    // let user = JSON.parse(req.body.user_info);
  
    // if (user !== null) {
  
    //   let categories;
    //   return res.render("homeafterlogin.ejs", {
    //     value: categories,
    //     user: user
    //   });
  
    // }
    
    let user = {
        playername: req.body.playername,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      };
    console.log(user.username);
    DB_auth.insertAccountIntoDB(user.playername,user.email,user.username,user.password)
    let resultss = await DB.allgames()
        res.render("homeafterlogin.ejs", {
          AllGames : resultss
        }
        
      );
      
  });


  module.exports = router;