const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB_auth = require("../database/dbauthapi");
 const DB = require("../database/dbHome");
 const dev = require("../database/dev");
// const DB_Seller = require("../Database/DB-seller-api");
const { count } = require("console");

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

router.post("/devGameEdit",async(req,res)=>{
  let devID = req.body.devID
  let gameID = req.body.gameID
  let game = await DB.getAGAME(gameID)
  res.render("editGames.ejs",{
    game: game,
    devID : devID,
    gameID : gameID
  })
});

router.post("/editedGame",async(req,res)=>{
  let devID = req.body.devID
  let gameID = req.body.gameID
  let newName = req.body.newGameName
  let newPrice = req.body.newPrice
  let newPlat = req.body.newPlatform
  let newPrice2 = parseFloat(newPrice);
  if(newPrice2 == NaN ){
    return res.redirect("/devGameEdit");
  }
  await dev.editGame(gameID,newName,newPrice2,newPlat)
  let game =await DB.getAGAME(gameID)
  res.render("editGames.ejs",{
    game: game,
    devID : devID,
    gameID : gameID
  })
});

router.post("/newDev",async(req,res)=>{
  let devID = req.body.devID
  let devName = req.body.devName
  let devEmail = req.body.devEmail
  let password = req.body.password
  results = await DB_auth.getPassfromDEV(devID)
      if(results.length>0){
        return res.status(400).json({ message : 'devid already exist' })
      }
      else{
        await DB_auth.insertAccountIntoDEV(devID,devName,devEmail,password)
        res.render("devLogin.ejs", {
        }
        
      );  
      }

});

router.post("/addGame",async(req,res)=>{
  let devID = req.body.devID
        res.render("devAddGame.ejs", {
          devID : devID

        }
        
      );  
      }

);

router.post("/makeGame",async(req,res)=>{
  let devID = req.body.devID
  let newName = req.body.newGameName
  let newPrice = req.body.newPrice
  let newPlat = req.body.newPlatform
  let gameGenre = req.body.newGenre
  let newPrice2 = parseFloat(newPrice);
  let gameID = makeid(10)
  let gg =await DB.getAGAME(gameID)
  while(gg.length>0){
    gameID=makeid(10)
    gg=await DB.getAGAME(gameID)
  }
  if(newPrice2 == NaN ){
    return res.redirect("/addGame");
  }
  await dev.addNewGame(devID,gameID,newName,newPrice2,newPlat,gameGenre)
  let game =await DB.getAGAME(gameID)
  res.render("editGames.ejs",{
    game: game,
    devID : devID,
    gameID : gameID
  })
});

router.post("/khoj", async (req, res) => {
  let devID = req.body.devID
  let key = req.body.searchKey
  key = key.toUpperCase();
  let Games= await DB.searchKey(key);
  // write db code here with condition
  res.render("devSearch.ejs",{
    Games: Games,
    devID : devID,
    key : key
  })
});



  module.exports = router;