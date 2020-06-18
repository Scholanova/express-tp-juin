'use strict'
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Author', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
}, {})
  return Users
}