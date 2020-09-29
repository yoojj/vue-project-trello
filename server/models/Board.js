module.exports = (sequelize, DataTypes) => {

    const Board = sequelize.define('board', {

        bno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: sequelize.UUIDV4,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        bgcolor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: 0,
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

    },{
        tableName: 'board',
        freezeTableName : false,
        timestamps: true,
        paranoid: true,
    });

    Board.associate = (model) => {
        Board.hasMany(model.Card, { foreignKey: { name: 'bno', allowNull: false }, onDelete: 'CASCADE' });
    };

    return Board;
};
