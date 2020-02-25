/* eslint-disable no-unused-vars */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    roles: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  Team.associate = function (models) {
    models.Team.belongsToMany(models.User, {
      through: 'user_team',
    });
  };
  return Team;
};
