module.exports = (sequelize, DataTypes) => {

    const Content = sequelize.define('content', {

        ccno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        label: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '',
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '',
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },{
        tableName: 'content',
        freezeTableName : false,
        timestamps: true,
        paranoid: true,
    });

    Content.associate = (model) => {
        Content.belongsTo(model.User, { foreignKey: { name: 'uno', allowNull: false }, onDelete: 'CASCADE' });
        Content.belongsTo(model.Card, { foreignKey: { name: 'bno', allowNull: false }, onDelete: 'CASCADE' });
        Content.hasMany(model.File, { foreignKey: 'cno'});
        Content.hasMany(model.Reply, { foreignKey: 'cno'});
    };

    return Content;
};
