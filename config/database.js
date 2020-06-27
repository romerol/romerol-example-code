const secrets = require("../secrets");

function getDBConfig(configEnv) {
  const env = configEnv || process.env;
  const dbUser = env.NODE_ENV === "test" ? secrets.TEST_DB_USER : secrets.DEV_DB_USER;
  const dbPassword = env.NODE_ENV === "test" ? secrets.TEST_DB_PASSWORD : secrets.DEV_DB_PASSWORD;
  
  return {
    "username": dbUser,
    "password": dbPassword,
    "database": "gutenberg_db",
    "host": "localhost",
    "dialect": "postgres",
    "dialectOptions": {
      "useUTC": true
    },
    "timezone": "+00:00",
    "seederStorage": "sequelize",
    "operatorsAliases": false    
  }
}

module.exports = {
  test: getDBConfig(),
  dev: getDBConfig(),
  getDBConfig
}