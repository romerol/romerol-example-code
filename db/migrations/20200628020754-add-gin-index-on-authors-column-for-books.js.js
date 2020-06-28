module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addIndex("Books", {
      name: "books_authors",
      fields: ["authors"],
      using: "gin"
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex("Books", "books_authors");
  }
};
