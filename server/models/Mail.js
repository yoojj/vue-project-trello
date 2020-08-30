module.exports = (sequelize, DataTypes) => {

    const Mail = sequelize.define('mail', {

        email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        isUser: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

    },{
        tableName: 'mail',
        freezeTableName : false,
        timestamps: true,
        force: true,
    });

    /*
    Mail.associate = (model) => {
        Mail.hasOne(model.User, { foreignKey: { name: 'email', allowNull: false }, onDelete: 'CASCADE' });
    };
    */

    return Mail;
};
