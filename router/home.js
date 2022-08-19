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
    //let username = "Not logged in"
  res.render("home.ejs", {
    AllGames : results,
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
      username : username,
      user : user
    })
  });

  router.post("/gameProfile",async(req,res)=>{
    let gameID=req.body.gameID
    let username=req.body.username
    let dlcs=await DB.getDLC(gameID)
    let game = await DB.getAGAME(gameID)
   // console.log(game)
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      dlcs : dlcs
    })
  });


  router.post("/groupProfile",async(req,res)=>{
    let groupID=req.body.groupID
    let username=req.body.username
    let group = await DB.getAGROUP(groupID)
    let groupMessages= await DB.getGROUPMSG(groupID)
   // console.log(game)
    res.render("groupProfile.ejs",{
      group: group,
      username : username,
      groupMessages : groupMessages,
    })
  });

    router.post("/getGame",async(req,res)=>{
    let username=req.body.username
  //  console.log(username)
    let gameID = req.body.game
    let dlcs=await DB.getDLC(gameID)
    let game = await DB.getAGAME(gameID)
   // console.log(dlcs)
    //write db code to buy game using condition
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      dlcs : dlcs
    })
  });

  router.post("/getGame",async(req,res)=>{
    let username=req.body.username
  //  console.log(username)
    let gameID = req.body.game
    let dlcs=await DB.getDLC(gameID)
    let game = await DB.getAGAME(gameID)
   // console.log(dlcs)
    //write db code to buy game using condition
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      dlcs : dlcs
    })
  });

  router.post("/getDLC", async (req, res) => {
    let username=req.body.username
    let dlc=req.body.dlc
    let gameID = req.body.game
    let dlcs=await DB.getDLC(gameID)
    let game = await DB.getAGAME(gameID)
    // write db code here with condition
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      dlcs : dlcs
    })
  });

  router.post("/searchresults", async (req, res) => {
    let username=req.body.username
    let key = req.body.searchKey
    key = key.toUpperCase();
    let Games= await DB.searchKey(key);
    // write db code here with condition
    res.render("searchResult.ejs",{
      Games: Games,
      username : username,
      key : key
    })
  });


  module.exports = router;