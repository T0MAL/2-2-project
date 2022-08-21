const database = require('./db');


async function getPassfromDB(user_name){
    const sql = `
    SELECT* 
    FROM 
        PLAYERS 
    WHERE 
        USERNAME = :user_name
        `;
    const binds = {
        user_name : user_name
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function insertAccountIntoDB(player_name,email,user_name,password) {
    console.log(user_name)
    let sql = `
    Insert into PLAYERS (USERNAME,PLAYEREMAIL,PLAYERNAME,PWD,PLAYERBALANCE,FRIENDCOUNT,PLAYERBIO) 
    values(:user_name,:email,:player_name,:password,0,0,'newbie')
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