const database = require('./db');

async function getGamesForDev(devID){
    const sql = `
    SELECT* 
    FROM 
        VIDEOGAMES
    WHERE DEVID = :devID
    `;
    const binds = {
        devID : devID
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function editGame(gameID,newName,newPrice,newPlat){
    let newPrice2 = parseFloat(newPrice)
    const sql = `
    UPDATE VIDEOGAMES
    SET GAMENAME = :newName, GAMEPRICE= ${newPrice2}, CONSOLE = :newPlat
    WHERE GAMEID = :gameID
    `;
    const binds = {
        gameID : gameID,
        newName : newName,
        newPrice2 : newPrice2,
        newPlat : newPlat
    }

    return (await database.execute(sql, binds, database.options));
}

async function addNewGame(devID,gameID,gameName,gamePrice,gamePlat,gameGenre){
    let gamePrice2 = parseFloat(gamePrice)
    const sql = `
    INSERT INTO VIDEOGAMES
    VALUES(:gameID,:gamename,:gamePrice2,:gameGenre,5,SYSDATE,0,:gamePlat,:devID,0)
    `;
    const binds = {
        devID : devID,
        gameID : gameID,
        gameName : gameName,
        gamePrice2 : gamePrice2,
        gamePlat : gamePlat,
        gameGenre : gameGenre
    }

    return (await database.execute(sql, binds, database.options));
}


module.exports = {
    getGamesForDev,
    editGame,
    addNewGame,
};