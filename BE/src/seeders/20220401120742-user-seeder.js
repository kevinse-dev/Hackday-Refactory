'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [{
        username: 'John Doe',
        email:'jhon@gmail.com',
        password:'123123',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
  }
};
