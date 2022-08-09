const database = require('./db');

async function allgames(){
    const sql = `
    SELECT* 
    FROM 
        SYSTEM.VIDEOGAMES
    `;

    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    allgames,
};