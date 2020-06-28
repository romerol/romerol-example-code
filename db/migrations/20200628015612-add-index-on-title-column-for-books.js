module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addIndex("Books", {
      name: "books_title",
      fields: [
        "title"
      ]
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex("Books", "books_title");
  }
};
