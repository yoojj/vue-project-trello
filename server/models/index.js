const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config')[process.env.NODE_ENV];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    timezone: '+09:00',
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
    },
});

const db = {};



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
