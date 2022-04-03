"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Contacts",
      [
        {
          fk_id: 1,
          name: "duanda",
          telephone: "0896845215",
          address: "Bandung,Indonesia",
          postal_code: "40622",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contacts", null, {});
  },
};
