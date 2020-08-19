const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config')[process.env.NODE_ENV];

const db = {};
let sequelize;



if(config.use_env_variable) {
    sequelize = new Sequelize(
        process.env[config.use_env_variable],
        config,
    );

} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
            host: config.host,
            dialect: config.dialect,
        }
    );
}

fs.readdirSync(__dirname).filter( file => {
    return (file.indexOf('.' !== 0)) && (file !== 'index.js');

}).forEach( file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    const name = model.name[0].toUpperCase() + model.name.slice(1);
    db[name] = model;
});

Object.keys(db).forEach( modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;
