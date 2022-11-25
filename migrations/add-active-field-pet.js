"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("pets", "active", {
        allowNull: true,
        type: Sequelize.DataTypes.BOOLEAN,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Drop pets
     */
    // await queryInterface.dropTable("pets");
  },
};
