const database = require('./db');



async function allgames(){
    const sql = `
    SELECT* 
    FROM 
        VIDEOGAMES
    `;
    const binds = {

    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getPostbyID(postID){
    const sql = `
    SELECT* 
    FROM 
        POST 
    WHERE POSTID = :postID
    `;
    const binds = {
        postID : postID
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getBlogbyID(blogID){
    const sql = `
    SELECT* 
    FROM 
        BLOG 
    WHERE BLOGID = :blogID
    `;
    const binds = {
        blogID : blogID
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function playeDetails(user_id){
    const sql = `
    SELECT*
    FROM 
        PLAYERS
    WHERE USERNAME = :user_id
    `;
    const binds = {
        user_id:user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}



async function myGames(username){
    const sql = `
    SELECT* 
    FROM 
        VIDEOGAMES
    WHERE
        GAMEID = ANY (
            SELECT GAMEID
            FROM PURCHASE
            WHERE :username = USERNAME
        )
    
    `;
    const binds = {
        username : username
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function isMyGames(username,gameID){
    const sql = `
    SELECT* 
    FROM 
        PURCHASE
    WHERE
        GAMEID = :gameID
        AND
        USERNAME = :username
    
    `;
    const binds = {
        username : username,
        gameID : gameID
    }

    return (await database.execute(sql, binds, database.options)).rows;
}



async function purchaseGame(playerID,gameID){
    let sql = `
    Insert into PURCHASE (USERNAME,GAMEID,PURCHASEDATE) 
    values(:playerID,:gameID,SYSDATE)
    `;
    const binds = {
        playerID : playerID,
        gameID : gameID
    }
    return (await database.execute(sql,binds, database.options))
}

async function searchKey(key){
    const sql = `
    SELECT*
    FROM 
        VIDEOGAMES
    WHERE ( UPPER(GAMENAME) LIKE '%'||:key||'%')
    OR
    ( UPPER(GAMEGENRE) LIKE '%'||:key||'%')
    OR
    ( UPPER(CONSOLE) LIKE '%'||:key||'%')
    `;
    const binds = {
        key : key
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function searchBlog(key){
    const sql = `
    SELECT*
    FROM 
        BLOG
    WHERE ( UPPER(BLOGTITLE) LIKE '%'||:key||'%')
    `;
    const binds = {
        key : key
    }

    return (await database.execute(sql, binds, database.options)).rows;
}


async function getAllCategories() {
    const sql = `
        SELECT DISTINCT GAMEGENRE
        FROM VIDEOGAMES
        `;
    const binds = {

    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getAllBlogs() {
    const sql = `
        SELECT*
        FROM BLOG
        `;
    const binds = {

    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getMyBlogs(username) {
    const sql = `
        SELECT*
        FROM BLOG
        WHERE BLOGID = ANY (SELECT BLOGID
            FROM BLOGMEMBERS
            WHERE USERNAME=:username
            )
        `;
    const binds = {
        username : username
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getABlog(blogID) {
    const sql = `
        SELECT*
        FROM BLOG
        WHERE BLOGID = :blogID
        `;
    const binds = {
        blogID : blogID
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getBlogPost(blogID) {
    const sql = `
        SELECT p.POSTID,p.TEXT,p.POSTDATE,pu.USERNAME
        FROM POST p,POST_UTIL pu
        WHERE pu.POSTID = p.POSTID AND pu.BLOGID = :blogID
        ORDER BY p.POSTDATE DESC
        `;
    const binds = {
        blogID : blogID
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getGamesByCategories(category){
    const sql = `
        SELECT* 
        FROM VIDEOGAMES
        WHERE GAMEGENRE = :category
        `;
    const binds={
        category : category
    }
    return (await database.execute(sql,binds,database.options)).rows;
}

async function getFreeGames(){
    const sql = `
        SELECT* 
        FROM VIDEOGAMES
        WHERE GAMEPRICE = 0
        `;
    const binds={

    }
    return (await database.execute(sql,binds,database.options)).rows;
}
async function getAllUsers() {
    const sql = `
        SELECT *
        FROM PLAYERS
        `;
    const binds = {
        
    }

    return (await database.execute(sql, binds, database.options)).rows;
}


async function getAllProductsWithinPrice(price) {
    const sql = `
        SELECT *
        FROM SYSTEM.VIDEOGAMES
         WHERE GAMEPRICE<:price
        `;
    const binds = {
        price: price
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAGAME(g_id) {
    const sql = `
        SELECT *
        FROM VIDEOGAMES
        WHERE GAMEID = :g_id
        `;
    const binds = {
        g_id: g_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getDLC(gameID) {
    const sql = `
        SELECT *
        FROM DLC
        WHERE GAMEID = :gameID
        `;
    const binds = {
        gameID : gameID
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function ownDLC(DLCID,username) {
    const sql = `
        INSERT INTO DLC_UTIL
        VALUES(:DLCID,:username)
        `;
    const binds = {
        DLCID : DLCID,
        username : username
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getUserRecom(user_id){
    const sql = `
        SELECT*
        FROM 
        (SELECT
            )
   `;

   const binds={
    user_id : user_id
   }

   return (await database.execute(sql, binds, database.options)).rows;
}


async function editproiflewithoutpass(username,newName,newEmail,newBio){
    let sql = `
    UPDATE players
    SET PLAYERNAME = :newName, PLAYEREMAIL= :newEmail, PLAYERBIO = :newBio
    WHERE username= :username
    `;
    const binds = {
        username : username,
        newName : newName,
        newEmail : newEmail,
        newBio : newBio
    }
    return (await database.execute(sql,binds, database.options))
}

async function editproiflewithpass(username,newName,newEmail,newBio,newPass){
    let sql = `
    UPDATE players
    SET PLAYERNAME = :newName, PLAYEREMAIL= :newEmail, PLAYERBIO = :newBio, PWD = :newPass
    WHERE username= :username
    `;
    const binds = {
        username : username,
        newName : newName,
        newEmail : newEmail,
        newBio : newBio,
        newPass : newPass
    }
    return (await database.execute(sql,binds, database.options))
}

async function isBlogMember(username, blogID){
    const sql = `
    SELECT* 
    FROM BLOGMEMBERS
    WHERE BLOGID = :blogID AND USERNAME = :username
   `;

   const binds={
    username : username,
    blogID : blogID
   }

   return (await database.execute(sql, binds, database.options)).rows;
}

async function getNews(){
    const sql = `
    SELECT* 
    FROM NEWS
   `;

   const binds={
    
   }

   return (await database.execute(sql, binds, database.options)).rows;
}

async function getChampionship(){
    const sql = `
    SELECT C.CONTNAME AS CONT,C.VENUE AS VEN,C.WINNER AS WIN,C.RUNNERSUP AS RUN,G.GAMENAME AS GAME,G.GAMEID as gID
    FROM CHAMPIONSHIPS C, VIDEOGAMES G
    WHERE C.GAMEID = G.GAMEID
    ORDER BY C.ENDDATE DESC
   `;

   const binds={
    
   }

   return (await database.execute(sql, binds, database.options)).rows;
}

async function addToBlog(username, blodID){
    const sql = `
    INSERT INTO BLOGMEMBERS
    VALUES(:blogID,:username,SYSDATE)
   `;

   const binds={
    username : username,
    blogID : blodID
   }

   return (await database.execute(sql, binds, database.options));
}

async function createPost(postID,blogText){
    const sql = `
    INSERT INTO POST
    VALUES(:postID,:blogText,SYSDATE)
   `;

   const binds={
        postID : postID,
        blogText : blogText
   }

   return (await database.execute(sql, binds, database.options));
}

async function createBlog(blogID,blogTitle,blogDes,username){
    const sql = `
    INSERT INTO BLOG
    VALUES(:blogID,:blogTitle,:blogDes,:username)
   `;

   const binds={
        blogID : blogID,
        blogTitle : blogTitle,
        blogDes : blogDes,
        username : username
   }

   return (await database.execute(sql, binds, database.options));
}

async function addPost(postID,blogID,username){
    const sql = `
    INSERT INTO POST_UTIL
    VALUES(:postID,:blogID,:username)
   `;

   const binds={
        postID : postID,
        blogID : blogID,
        username : username
   }

   return (await database.execute(sql, binds, database.options));
}

async function getOwnedDLC(username,gameID){
    const sql = `
    SELECT D.DLCNAME as DLCNAME,D.DLCID as DLCID
    FROM DLC D,DLC_UTIL DU
    WHERE D.GAMEID = :gameID AND DU.USERNAME = :username AND D.DLCID = DU.DLCID
   `;

   const binds={
    username : username,
    gameID : gameID,
   }

   return (await database.execute(sql, binds, database.options)).rows;
}
async function getNotOwnedDLC(username,gameID){
    const sql = `
    SELECT D.DLCNAME as DLCNAME,D.DLCID as DLCID
    FROM DLC D,DLC_UTIL DU
    WHERE D.GAMEID = :gameID AND D.DLCID = DU.DLCID AND :username NOT IN (SELECT USERNAME FROM DLC_UTIL WHERE DLCID = D.DLCID ) 
   `;

   const binds={
    username : username,
    gameID : gameID
   }

   return (await database.execute(sql, binds, database.options)).rows;
}

async function getUserAchiv(username){
    const sql = `
    SELECT*
    FROM CHAMPIONSHIPS
    WHERE WINNER = :username OR RUNNERSUP = :username
   `;

   const binds={
    username : username,
   }

   return (await database.execute(sql, binds, database.options)).rows;
}

async function buyDLC(username,dlcID){
    const sql = `
    INSERT INTO DLC_UTIL
    VALUES(:dlcID,:username)
   `;

   const binds={
        username : username,
        dlcID : dlcID,
   }

   return (await database.execute(sql, binds, database.options));
}

async function buyDLC(username,dlcID){
    const sql = `
    INSERT INTO DLC_UTIL
    VALUES(:dlcID,:username)
   `;

   const binds={
        username : username,
        dlcID : dlcID,
   }

   return (await database.execute(sql, binds, database.options));
}

async function adView(gameID){
    const sql = `
    EXECUTE addView ':gameID'
   `;
   const binds={
        gameID : gameID
   }

   return (await database.execute(sql, binds, database.options));
}

async function recentlyReleased(){
    const sql = `
    SELECT*
    FROM 
        VIDEOGAMES
    WHERE 
    PUBLISHINGDATE > (SYSDATE-7)
   `;

   const binds={
   }

   return (await database.execute(sql, binds, database.options)).rows;
}





module.exports = {
    addPost,
    createPost,
    allgames,
    getGamesByCategories,
    getAGAME,
    getAllCategories,
    getAllUsers,
    getAllProductsWithinPrice,
    playeDetails,
    getDLC,
    searchKey,
    purchaseGame,
    myGames,
    isMyGames,
    editproiflewithoutpass,
    editproiflewithpass,
    getAllBlogs,
    getMyBlogs,
    getABlog,
    getBlogPost,
    isBlogMember,
    addToBlog,
    getPostbyID,
    getBlogbyID,
    createBlog,
    getFreeGames,
    searchBlog,
    ownDLC,
    getNews,
    getChampionship,
    getOwnedDLC,
    getNotOwnedDLC,
    buyDLC,
    getUserAchiv,
    adView,
    recentlyReleased
};