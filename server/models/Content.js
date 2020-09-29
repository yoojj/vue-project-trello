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
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        label: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        Content.belongsTo(model.Card, { foreignKey: { name: 'cno', allowNull: false }, onDelete: 'CASCADE' });
        Content.hasMany(model.File, { foreignKey: 'ccno'});
        Content.hasMany(model.Reply, { foreignKey: 'ccno'});
    };

    return Content;
};
