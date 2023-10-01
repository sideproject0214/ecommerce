module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "size", {
      type: Sequelize.ARRAY(Sequelize.JSONTYPE),
      unique: false,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("posts", "size");
  },
};
