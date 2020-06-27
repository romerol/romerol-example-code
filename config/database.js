const secrets = require("../secrets");

function getDBConfig(configEnv) {
  const env = configEnv || process.env;
  const dbUser = env.NODE_ENV === "test" ? secrets.TEST_DB_USER : secrets.DEV_DB_USER;
  const dbPassword = env.NODE_ENV === "test" ? secrets.TEST_DB_PASSWORD : secrets.DEV_DB_PASSWORD;
  const dbName = env.NODE_ENV === "test" ? "gutenberg_db_test" : "gutenberg_db";
  
  return {
    "username": dbUser,
    "password": dbPassword,
    "database": dbName,
    "host": "localhost",
    "dialect": "postgres",
    "dialectOptions": {
      "useUTC": true
    },
    "timezone": "+00:00",
    "seederStorage": "sequelize"
  }
}

module.exports = {
  test: getDBConfig(),
  dev: getDBConfig(),
  getDBConfig
}