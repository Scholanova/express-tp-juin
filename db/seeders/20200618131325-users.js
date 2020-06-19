'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users',
      [
        {
          id: 100001,
          name: 'User 1',
          email: 'test1@hotmail.fr',
          password: 'password1',
          createdAt: new Date('1712-06-28T15:24:00'),
          updatedAt: new Date('1778-07-02T03:56:00')
        },
        {
          id: 100002,
          name: 'User 2',
          email:'test2@gmail.com',
          password: 'password2',
          createdAt: new Date('1905-06-21T10:31:00'),
          updatedAt: new Date('1980-04-15T21:01:00')
        }
      ],
   )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
