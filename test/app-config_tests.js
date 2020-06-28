const appConfig = require("../config/app-config");
const { expect } = require("chai");

describe("App config tests", function () { 
  it("should have the correct URL", function () {
    expect(appConfig.downloadURL).to.be.eql("http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip");
  });

  it("should have the correct tmp folder", function () {
    expect(appConfig.tmpFolder).to.be.eql("./tmp");
  });  
  
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
