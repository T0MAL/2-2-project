const database = require('./db');

async function allgames(){
    const sql = `
    SELECT* 
    FROM 
        SYSTEM.VIDEOGAMES
    `;
    const binds = {

    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function playeDetails(user_id){
    const sql = `
    SELECT*
    FROM 
        SYSTEM.PLAYERS
    WHERE PLAYERID = :user_id
    `;
    const binds = {
        user_id:user_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function searchKey(key){
    const sql = `
    SELECT*
    FROM 
        SYSTEM.VIDEOGAMES
    WHERE ( UPPER(GAMENAME) LIKE '%'||:key||'%')
    OR
    ( UPPER(GAMEGENRE) LIKE '%'||:key||'%')
    OR
    ( UPPER(DEV) LIKE '%'||:key||'%')
    `;
    const binds = {
        key : key
    }

    return (await database.execute(sql, binds, database.options)).rows;
}


async function getAllCategories() {
    const sql = `
        SELECT DISTINCT Category
        FROM SYSTEM.Catagories
        `;
    const binds = {

    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getGamesByCategories(category){
    const sql = `
        SELECT* 
        FROM SYSTEM.VIDEOGAMES
        `;
    const binds={
        category : category
    }
    return (await database.execute(sql,binds,database.options)).rows;
}
async function getAllUsers(category) {
    const sql = `
        SELECT *
        FROM SYSTEM.PLAYERS
        `;
    const binds = {
        category: category
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function purchase(user_id, game_id,date){
    const sql = `
    INSERT INTO SYSTEM.PURCHASE
    VALUES(:user_id,:game_id,"date)
   `;

   const binds={
    user_id : user_id,
    game_id : game_id,
    date : date
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
        FROM SYSTEM.VIDEOGAMES
        WHERE GAMEID = :g_id
        `;
    const binds = {
        g_id: g_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getDLC(g_id) {
    const sql = `
        SELECT *
        FROM SYSTEM.DLC
        WHERE GAMEID = :g_id
        `;
    const binds = {
        g_id: g_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
async function isInCart(player, game) {
    const sql = `
        SELECT COUNT(*) as COUNT
        FROM Cart
        WHERE product_id = :product_id
        AND
        person_id = :person_id
        AND CART_ID IS NULL
        `;
    const binds = {
        person_id: person_id,
        product_id: product_id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function addToCart(person_id, product_id, quantity) {
    const sql = `
        INSERT INTO SYSTEM.Cart
        VALUES(:person_id,:product_id, :quantity)
        `;
    const binds = {
        person_id: person_id,
        product_id: product_id,
        quantity: quantity,
    
    }

    return (await database.execute(sql, binds, database.options));
}


async function getCartItems(person_id) {
    const sql = `
        SELECT *
        FROM SYSTEM.Cart
        WHERE person_id==:person_id
        `;
    const binds = {
        person_id: person_id,

    }

    return (await database.execute(sql, binds, database.options)).rows;
}


async function deleteItemFromCart(person_id, product_id) {
    const sql = `
        DELETE FROM SYSTEM.CART
        WHERE product_id = :product_id
        AND person_id = :person_id
   `;
    const binds = {
        person_id: person_id,
        product_id: product_id
    };
    (await database.execute(sql, binds, database.options));
    return;
}

async function getUserDetails(person_id) {
    const sql = `
        SELECT *
        FROM SYSTEM.PLAYERS
        WHERE PLAYERID = :person_id
   `;
    const binds = {
        person_id: person_id,
    };
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



async function addToWishList(user_id, game_id){
    const sql = `
    INSERT INTO SYSTEM.WISHLIST
    VALUES(:user_id,:game_id)
   `;

   const binds={
    user_id : user_id,
    game_id : game_id
   }

   return (await database.execute(sql, binds, database.options)).rows;
}

async function addToGROUP(user_id, group_id){
    const sql = `
    INSERT INTO SYSTEM.WISHLIST
    VALUES(:user_id,:game_id)
   `;

   const binds={
    user_id : user_id,
    game_id : game_id
   }

   return (await database.execute(sql, binds, database.options)).rows;
}




module.exports = {
    allgames,
    getUserDetails,
    deleteItemFromCart,
    getCartItems,
    getGamesByCategories,
    getAGAME,
    getAllCategories,
    getAllUsers,
    getAllProductsWithinPrice,
    addToCart,
    isInCart,
    purchase,
    playeDetails,
    getDLC,
    searchKey,
};