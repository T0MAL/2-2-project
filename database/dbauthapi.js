const database = require('./db');

async function getPassfromDB(user_name){
    const sql = `
    SELECT* 
    FROM 
        SYSTEM.PLAYERS 
    WHERE 
        PLAYERID = :user_name
        `;
    const binds = {
        user_name : user_name
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function insertAccountIntoDB(player_name,user_name,email,password) {
    console.log(user_name)
    let sql = `
    Insert into SYSTEM.PLAYERS (PLAYERID,PLAYEREMAIL,PLAYERNAME,PWD) 
    values(:user_name,:email,:player_name,:password)
    `;
    const binds = {
        user_name : user_name,
        password : password,
        player_name : player_name,
        email : email
    }
    return (await database.execute(sql,binds, database.options))
}
module.exports = {
    getPassfromDB,
    insertAccountIntoDB,
};