const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB = require("../database/dbHome");
const { count } = require("console");


//let person_id;
//let USER_NAME = null;

router.get("/", (req, res) => {
  res.render("homeafterlogin.ejs", {
  })
});

router.post("/homeafterlogin", async (req, res) => {
    results = await DB.allgames()
    console.log(results);
    res.render("homeafterlogin.ejs", {
        AllGames : results
      })
    
  });

  module.exports = router;