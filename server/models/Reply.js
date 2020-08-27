module.exports = (sequelize, DataTypes) => {

    const Reply = sequelize.define('reply', {

        rno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },{
        tableName: 'reply',
        freezeTableName : false,
        timestamps: true,
        paranoid: true,
    });

    Reply.associate = (model) => {
        Reply.belongsTo(model.User, { onDelete: 'CASCADE' });
        Reply.belongsTo(model.Card, { onDelete: 'CASCADE' });
    };

    return Reply;
};
