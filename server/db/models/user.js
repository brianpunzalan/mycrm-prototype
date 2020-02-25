/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    roles: DataTypes.ARRAY(DataTypes.TEXT),
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    salutation: DataTypes.STRING,
    password: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    createdBy: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    models.User.belongsToMany(models.Team, {
      through: 'user_team',
    });
  };
  return User;
};
