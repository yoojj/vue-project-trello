module.exports = (sequelize, DataTypes) => {

    const Board = sequelize.define('board', {

        bno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
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
        bookmark: {
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
