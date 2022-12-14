const express = require("express");
//const marked = require('marked');

const router = express.Router({ mergeParams: true });
const DB = require("../database/dbHome");
const DB2 = require("../database/dbauthapi");
const { count } = require("console");


//let person_id;
//let USER_NAME = null;


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


router.get("/",async (req, res) => {
    results = await DB.allgames()
    freeGames = await DB.getFreeGames()
    //console.log(results);
    //let username = "Not logged in"
  res.render("home.ejs", {
    AllGames : results,
    freeGames : freeGames
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

  router.post("/publicProfile", async (req, res) => {
    let username = req.body.username
    let visiting = req.body.visiting
    console.log(visiting)
   if(username==visiting){
    let user= await DB.playeDetails(username)
    let Games = await DB.myGames(username)
    console.log(user)
    res.render("profile.ejs",{
      username : username,
      user : user,
      Games : Games
    })
   }
   else{
    let user= await DB.playeDetails(visiting)
    let Games = await DB.myGames(visiting)
    console.log(user)
    res.render("publicProfile.ejs",{
      username : username,
      user : user,
      Games : Games
    })
   }
    
  });

  router.post("/gameProfile",async(req,res)=>{
    let gameID=req.body.gameID
    let username=req.body.username
    await DB.adView(gameID)
    let ownedDlcs=await DB.getOwnedDLC(username,gameID)
    let notOwnedDlcs= await DB.getNotOwnedDLC(username,gameID)
    let game = await DB.getAGAME(gameID)
    let gg= await DB.isMyGames(username,gameID)
    let flag=true
    if(gg.length>0){
        flag=false
    }
    console.log(username)
    console.log(gameID)
   console.log(notOwnedDlcs)
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      ownedDlcs : ownedDlcs,
      notOwnedDlcs : notOwnedDlcs,
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
    let ownedDlcs=await DB.getOwnedDLC(username,gameID)
    let notOwnedDlcs= await DB.getNotOwnedDLC(username,gameID)
    let game = await DB.getAGAME(gameID)
   // console.log(dlcs)
    //write db code to buy game using condition
    let bara = await DB.purchaseGame(username,gameID)
    let gg= await DB.isMyGames(username,gameID)
    let flag=true
    if(gg.length>0){
        flag=false
    }
    console.log(notOwnedDlcs)
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      ownedDlcs : ownedDlcs,
      notOwnedDlcs : notOwnedDlcs,
      flag : flag
    })
  });

  router.post("/getDLC",async(req,res)=>{
    let username=req.body.username
  //  console.log(username)
    let gameID = req.body.game
    
    let game = await DB.getAGAME(gameID)
   // console.log(dlcs)
    //write db code to buy game using condition
    let dlcID = req.body.dlcID
    await DB.buyDLC(username,dlcID)
    let gg= await DB.isMyGames(username,gameID)
    let flag=true
    if(gg.length>0){
        flag=false
    }
    let ownedDlcs=await DB.getOwnedDLC(username,gameID)
    let notOwnedDlcs= await DB.getNotOwnedDLC(username,gameID)
    console.log(notOwnedDlcs)
    res.render("gameProfile.ejs",{
      game: game,
      username : username,
      ownedDlcs : ownedDlcs,
      notOwnedDlcs : notOwnedDlcs,
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

  router.get("/championship", async (req, res) => {
    let username=req.body.username
    res.render("tourneys.ejs",{
      username : username,
    })
  });

  router.post("/allBlogs", async (req, res) => {
    let username=req.body.username
    let allBlogs=await DB.getAllBlogs()
    let myBlogs=await DB.getMyBlogs(username)
    //console.log(myBlogs)
    let blogSearchResult=[]
    res.render("allblogs.ejs",{
      username : username,
      allBlogs : allBlogs,
      myBlogs : myBlogs,
      blogSearchResult : blogSearchResult
    })
  });

  router.post("/blogSearch", async (req, res) => {
    let username=req.body.username
    let key=req.body.key
    let blogSearchResult = await DB.searchBlog(key)
    let allBlogs=await DB.getAllBlogs()
    let myBlogs=await DB.getMyBlogs(username)
    console.log(blogSearchResult)
    res.render("allblogs.ejs",{
      username : username,
      allBlogs : allBlogs,
      myBlogs : myBlogs,
      blogSearchResult : blogSearchResult
    })
  });

  router.post("/blogHome", async (req, res) => {
    let username=req.body.username
    let blogID= req.body.blogID
    let blog = await DB.getABlog(blogID)
    let posts=await DB.getBlogPost(blogID)
    let flag=false
    let flag2=false
    let tmp=await DB.isBlogMember(username,blogID)
    if(blog[0].username == username){
        flag=true
    }
    if(tmp.length> 0){
      flag2=true
    }
    let plainT=""
    res.render("blogHome.ejs",{
      username : username,
      blog : blog,
      posts : posts,
      flag : flag,
      flag2 : flag2,
      plainT : plainT
    })
  });

  router.post("/followBlog", async (req, res) => {
    let username=req.body.username
    let blogID= req.body.blogID
    await DB.addToBlog(username,blogID)
    let blog = await DB.getABlog(blogID)
    let posts=await DB.getBlogPost(blogID)
    let flag=false
    let flag2=false
    let tmp=await DB.isBlogMember(username,blogID)
    console.log(tmp)
    if(blog[0].username == username){
        flag=true
    }
    if(tmp.length> 0){
      flag2=true
    }
    let plainT=""
    res.render("blogHome.ejs",{
      username : username,
      blog : blog,
      posts : posts,
      flag : flag,
      flag2 : flag2,
      plainT : plainT
    })
  });

  router.post("/postBlogIn", async (req, res) => {
    let username=req.body.username
    let blogID= req.body.blogID
    let postText = req.body.postText
    if(postText.length>0){
      let postID=makeid(10)
      //  await DB.addToBlog(username,blogID)
        let gg = await DB.getPostbyID(postID)
        while(gg.length>0){
          postID=makeid(10)
          gg=await DB.getPostbyID(postID)
        }
        await DB.createPost(postID,postText)
        await DB.addPost(postID,blogID,username)
    }
    
    let blog = await DB.getABlog(blogID)
    let posts=await DB.getBlogPost(blogID)
    let flag=false
    let flag2=false
    let tmp=await DB.isBlogMember(username,blogID)
    if(blog[0].username == username){
        flag=true
    }
    if(tmp.length> 0){
      flag2=true
    }
    let plainT=""
    res.render("blogHome.ejs",{
      username : username,
      blog : blog,
      posts : posts,
      flag : flag,
      flag2 : flag2,
      plainT : plainT
    })
  });


  router.post("/createBlog", async (req, res) => {
    let username=req.body.username
    let blogTitle = req.body.blogTitle
    let blogDes=req.body.blogDes
    let blogID=makeid(10)
    if(blogTitle!=""){
      
        let gg = await DB.getBlogbyID(blogID)
        while(gg.length>0){
          blogID=makeid(10)
          gg=await DB.getBlogbyID(blogID)
        }
        await DB.createBlog(blogID,blogTitle,blogDes,username)
    }
    console.log(blogID)
    console.log(blogTitle)
    console.log(blogDes)
    console.log(username)
    let blog = await DB.getABlog(blogID)
    let posts=await DB.getBlogPost(blogID)
    let flag=false
    let flag2=false
    let tmp=await DB.isBlogMember(username,blogID)
    if(blog.length>0 && blog[0].username == username){
        flag=true
    }
    if(tmp.length> 0){
      flag2=true
    }
    let plainT=""
    res.render("blogHome.ejs",{
      username : username,
      blog : blog,
      posts : posts,
      flag : flag,
      flag2 : flag2,
      plainT : plainT
    })
  });

  router.post("/blogCreatePage", async (req, res) => {
    let username=req.body.username
    res.render("createBlog.ejs",{
      username : username,
    })
  });


  router.post("/getNews", async (req, res) => {
    let username=req.body.username
    let news =await DB.getNews()
    res.render("news.ejs",{
      username : username,
      NEWS : news,
    })
  });

  router.post("/getChampionship", async (req, res) => {
    let username=req.body.username
    let contest =await DB.getChampionship()

    res.render("championship.ejs",{
      username : username,
      contest : contest
    })
  });

    ///////admin started

  router.post("/everyGames", async (req, res) => {
    let username=req.body.username
    let resultss = await DB.allgames()
    res.render("allGames.ejs",{
      username : username,
        AllGames : resultss
    })
  });




  module.exports = router;