module.exports = (sequelize, DataTypes) => {

    const Card = sequelize.define('card', {

        cno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },{
        tableName: 'card',
        freezeTableName : false,
        timestamps: true,
        paranoid: true,
    });

    Card.associate = (model) => {
        Card.belongsTo(model.User, { onDelete: 'CASCADE' });
        Card.hasMany(model.File, { foreignKey: 'cno'});
        Card.hasMany(model.Reply, { foreignKey: 'cno'});
    };

    return Card;
};
