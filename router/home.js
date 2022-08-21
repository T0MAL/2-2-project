const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB = require("../database/dbHome");
const DB2 = require("../database/dbauthapi");
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
    let Games = await DB.myGames(username)
   // console.log(user)
    res.render("profile.ejs",{
      username : username,
      user : user,
      Games : Games
    })
  });

  router.post("/gameProfile",async(req,res)=>{
    let gameID=req.body.gameID
    let username=req.body.username
    let dlcs=await DB.getDLC(gameID)
    let game = await DB.getAGAME(gameID)
    let gg= await DB.isMyGames(username,gameID)
    let flag=true
    if(gg.length>0){
        flag=false
    }
   console.log(flag)
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      dlcs : dlcs,
      flag : flag
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
    let bara = await DB.purchaseGame(username,gameID)
    let gg= await DB.isMyGames(username,gameID)
    let flag=true
    if(gg.length>0){
        flag=false
    }
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      dlcs : dlcs,
      flag : flag
    })
  });

  router.post("/editProfile",async(req,res)=>{
    let username=req.body.username
    let user =await DB.playeDetails(username)
    console.log(user)
    res.render("editProfile.ejs",{
      username : username,
      user : user
    })
  });

  router.post("/editedProfile",async(req,res)=>{
    let username=req.body.username
    let Games = await DB.myGames(username)
    let playerNewName = req.body.playerNewName
    let newEmail = req.body.newEmail
    let newBio = req.body.newBio
    let newPassword = req.body.newPassword
    let password = req.body.password
    results = await DB2.getPassfromDB(username)
      let pass_db
      if(results.length>0){
        pass_db = results[0].PWD;
      }
      if (password === pass_db) {
        if(newPassword==""){
          //editprofilewithpass()
          await DB.editproiflewithoutpass(username,playerNewName,newEmail,newBio)
          let user= await DB.playeDetails(username)
          res.render("profile.ejs",{
          username : username,
          user : user,
          Games : Games
        })
        }
        else{
          await DB.editproiflewithpass(username,playerNewName,newEmail,newBio,newPassword)
          res.render("login.ejs",{
            
          })
        }
        
      }
      
   // console.log(game)
   let user = DB.playeDetails(username)
   res.render("profile.ejs",{
    username : username,
    user : user,
    Games : Games
  })
  });

  // router.post("/getGame",async(req,res)=>{
  //   let username=req.body.username
  // //  console.log(username)
  //   let gameID = req.body.game
  //   let dlcs=await DB.getDLC(gameID)
  //   let game = await DB.getAGAME(gameID)
  //  // console.log(dlcs)
  //   //write db code to buy game using condition
    
  //   let bought = DB.purchaseGame(username,gameID,sysda)

  //   res.render("gameProfile.ejs",{
  //     game: game,
  //     username : username,
  //     dlcs : dlcs
  //   })
  // });

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