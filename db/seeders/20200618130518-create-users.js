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
          // Id 100001 pour avoir un id fixe pour mettre dans books
          // Mais fixer l'id en bulk insert ne modifie par l'auto-increment naturel de postgres
          // Pour qu'il n'y ait pas de conflit, l'id est mis à "très grand"
          id: 100001,
          firstname: 'Jean-Jacques Rousseau',
          lastname: 'JJR',
          email: 'jj@rousseau.ch',
          createdAt: new Date('1712-06-28T15:24:00'),
          updatedAt: new Date('1778-07-02T03:56:00')
        },
        {
          id: 100002,
          firstname: 'Jean-Paul Sartre',
          lastname: 'JPP',
          email: 'jp_sartre@academie-francaise.fr',
          createdAt: new Date('1905-06-21T10:31:00'),
          updatedAt: new Date('1980-04-15T21:01:00')
        }
      ],
      {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
	return queryInterface.bulkDelete('Users', null, {})
  }
};
