const appConfig = require("../config/app-config");
const { expect } = require("chai");

describe("App config tests", function () {  
  describe("#getFilesPath", function () {
    it("should return the files path for test", function () {
      const env = {
        NODE_ENV: "test"
      };
      const result = appConfig.getFilesPath(env);

      expect(result).to.be.eql("./test/rdf-files");
    });

    it("should return the files path for dev", function () {
      const env = {
        NODE_ENV: "dev"
      };
      const result = appConfig.getFilesPath(env);

      expect(result).to.be.eql("./rdf-files");
    });
  });
});
