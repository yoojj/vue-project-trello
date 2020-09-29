module.exports = (sequelize, DataTypes) => {

    const File = sequelize.define('file', {

        fno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        saveFileName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        fileUrl: {
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
        tableName: 'file',
        freezeTableName : false,
        timestamps: true,
        paranoid: true,
    });

    File.associate = (model) => {
        File.belongsTo(model.User, { foreignKey: { name: 'uno', allowNull: false }, onDelete: 'CASCADE' });
        File.belongsTo(model.Content, { foreignKey: { name: 'ccno', allowNull: false }, onDelete: 'CASCADE' });
    };

    return File;
};
