module.exports = (sequelize, DataTypes) => {

    const Reply = sequelize.define('reply', {

        rno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        recontent: {
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
        Reply.belongsTo(model.User, { foreignKey: { name: 'uno', allowNull: false }, onDelete: 'CASCADE' });
        Reply.belongsTo(model.Content, { foreignKey: { name: 'ccno', allowNull: false }, onDelete: 'CASCADE' });
    };

    return Reply;
};
