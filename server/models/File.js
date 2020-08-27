module.exports = (sequelize, DataTypes) => {

    const File = sequelize.define('file', {

        fno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        FileName: {
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
        File.belongsTo(model.User, { onDelete: 'CASCADE' });
        File.belongsTo(model.Card, { onDelete: 'CASCADE' });
    };

    return File;
};
