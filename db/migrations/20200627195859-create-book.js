module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gbId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      authors: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      publisher: {
        allowNull: true,
        type: Sequelize.STRING
      },
      publicationDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      language: {
        allowNull: true,
        type: Sequelize.STRING
      },
      subjects: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      license: {
        allowNull: true,
        type: Sequelize.STRING
      },                                    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  }
};