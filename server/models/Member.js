module.exports = (sequelize, DataTypes) => {

    const Member = sequelize.define('member', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: DataTypes.STRING,

    },{
        tableName: 'member',
        freezeTableName : false,
        timestamps: true,
        paranoid: true,
    });

    //Member.associate = () => {};

    return Member;
}
