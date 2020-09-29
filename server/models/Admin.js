module.exports = (sequelize, DataTypes) => {

    const Admin = sequelize.define('admin', {

        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        loginedAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },

    },{
        tableName: 'admin',
        freezeTableName : false,
        timestamps: true,
        paranoid: true,
    });

    return Admin;
};
