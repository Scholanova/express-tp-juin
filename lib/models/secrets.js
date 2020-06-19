'use strict';
module.exports = (sequelize, DataTypes) => {
  const Secret = sequelize.define('Secret', {
    description: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Secret.associate = function(models) {
    // associations can be defined here
    Secret.belongsTo(models.Users, {foreignKey: 'userId', sourceKey: 'id'});
  };
  return Secret;
};