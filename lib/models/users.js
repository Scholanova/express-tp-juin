'use strict'
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
}, {})
return User
}
