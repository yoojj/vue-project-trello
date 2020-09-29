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
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        watch: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        Card.belongsTo(model.User, { foreignKey: { name: 'uno', allowNull: false }, onDelete: 'CASCADE' });
        Card.belongsTo(model.Board, { foreignKey: { name: 'bno', allowNull: false }, onDelete: 'CASCADE' });
    };

    return Card;
};
