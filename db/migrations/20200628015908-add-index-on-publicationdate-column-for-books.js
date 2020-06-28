module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addIndex("Books", {
      name: "books_publicationDate",
      fields: [
        "publicationDate"
      ]
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex("Books", "books_publicationDate");
  }
};
