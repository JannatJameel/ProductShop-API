module.exports = (sequelize, DataTypes) => sequelize.define("User", {
    username: { type: DataTypes.STRING, nique: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, isEmail: true },
    password: { type: DataTypes.STRING },
});