const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB_auth = require("../database/dbauthapi");
 const DB = require("../database/dbHome");
 const dev = require("../database/dev");
// const DB_Seller = require("../Database/DB-seller-api");
const { count } = require("console");
let alert = require('alert'); 


//let person_id;
//let USER_NAME = null;

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/devlogin", (req, res) => {
  res.render("devLogin.ejs");
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
      let freeGames = await DB.getFreeGames()
      let key = 'ACTION'
      let actionGames = await DB.searchKey(key)
      key = 'ADVENTURE'
    let adventureGames = await DB.searchKey(key)
    key = 'SPORTS'
    let sports = await DB.searchKey(key)
    let recent = await DB.recentlyReleased()
      if (password === pass_db) {
        res.render("homeafterlogin.ejs", {
          AllGames : resultss,
          username : username,
          freeGames : freeGames,
          actionGames : actionGames,
        adventureGames : adventureGames,
        sports : sports,
        recent : recent
        }
        
      );
      
      }
      else {
        return res.redirect("/login");
      }
  });

  router.post("/home2", async (req, res) => {
    let username = req.body.username;
    let resultss = await DB.allgames()
    let freeGames = await DB.getFreeGames()
    let key = 'action'
      let actionGames = await DB.searchKey(key)
      key = 'adventure'
    let adventureGames = await DB.searchKey(key)
    key = 'sports'
    let sports = await DB.searchKey(key)
    let recent = await DB.recentlyReleased()
      res.render("homeafterlogin.ejs", {
        AllGames : resultss,
        username : username,
        freeGames : freeGames,
        actionGames : actionGames,
        adventureGames : adventureGames,
        sports : sports,
        recent : recent
      }
      
    );
    
    

});

  router.get("/signup", async (req, res) => {
    res.render("signup.ejs");
  });

  router.post("/adminHome", async (req, res) => {
    let devID = req.body.devID
    console.log(devID)
    let password = req.body.password
    let results = await DB_auth.getPassfromDEV(devID)
    
    let pass_db
    if(results.length>0){
      pass_db = results[0].PWD;
    }
    console.log(pass_db)
    
    if (password === pass_db) {
      let devGames = await dev.getGamesForDev(devID)
      res.render("devHome.ejs", {
        devID : devID,
        devGames : devGames
      }
      
    );
    
    }
    else {
      return res.redirect("/devlogin");
    }
});



router.post("/adminHome2", async (req, res) => {
  let devID = req.body.devID
  
  let devGames = await dev.getGamesForDev(devID)
    res.render("devHome.ejs", {
      devID : devID,
      devGames : devGames
    }
    
  );
});

router.get("/signup", async (req, res) => {
  res.render("signup.ejs");
});

router.get("/devSignup", async (req, res) => {
  res.render("devSignup.ejs");
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