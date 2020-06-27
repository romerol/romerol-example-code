const config = require("../config/database");
const secrets = require("../secrets");
const { expect } = require("chai");

describe("DB config tests", function () {  
  it("should return the right setup for test", function () {
    const env = {
      NODE_ENV: "test"
    };
    const result = config.getDBConfig(env);

    expect(result).to.be.eql({
      "database": "gutenberg_db_test",
      "dialect": "postgres",
      "dialectOptions": {
        "useUTC": true
      },
      "host": "localhost",
      "password": secrets.TEST_DB_PASSWORD,
      "seederStorage": "sequelize",
      "timezone": "+00:00",
      "username": secrets.TEST_DB_USER,
    });
  });

  it("should return the right setup for dev", function () {
    const env = {
      NODE_ENV: "dev"
    };
    const result = config.getDBConfig(env);

    expect(result).to.be.eql({
      "database": "gutenberg_db",
      "dialect": "postgres",
      "dialectOptions": {
        "useUTC": true
      },
      "host": "localhost",
      "password": secrets.DEV_DB_PASSWORD,
      "seederStorage": "sequelize",
      "timezone": "+00:00",
      "username": secrets.DEV_DB_USER,
    });
  });  
});