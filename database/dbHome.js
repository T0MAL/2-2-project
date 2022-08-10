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

async function countIndividual(){
    const sql = `
    SELECT count(*)
    FROM 
        SYSTEM.PLAYERS
    `;
    const binds = {

    }

    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    allgames,
    countIndividual,
};