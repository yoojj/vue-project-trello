module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {

        cno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            defaultValue: '',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
        User.hasMany(model.Card, { foreignKey: 'uno' });
        User.hasMany(model.File, { foreignKey: 'uno' });
        User.hasMany(model.Reply, { foreignKey: 'uno' });
    };

    return User;
};
