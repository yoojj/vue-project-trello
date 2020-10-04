module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {

        uno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },        
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        id: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        loginedAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },

    },{
        tableName: 'user',
        freezeTableName : false,
        timestamps: true,
        paranoid: true,
    });

    User.associate = (model) => {
        User.hasMany(model.Board, { foreignKey: 'uno', sourceKey: 'uno' });
        User.hasMany(model.Card, { foreignKey: 'uno', sourceKey: 'uno' });
        User.hasMany(model.Content, { foreignKey: 'uno', sourceKey: 'uno' });
        User.hasMany(model.File, { foreignKey: 'uno' });
        User.hasMany(model.Reply, { foreignKey: 'uno' });
    };

    return User;
};
