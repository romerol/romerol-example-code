const models = require("../../db/models");

module.exports = function truncate() {
  if (process.env.NODE_ENV !== "test") {
    return Promise.reject(new Error("NODE_ENV is not test"));
  }

  return models.Book.destroy({where: {}, force: true});
};
