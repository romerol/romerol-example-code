const { expect } = require("chai");
const truncate = require("./fixtures/truncate");
const moment = require("moment");
const db = require("../db/models");
const parseFiles = require("../index");

describe("Index tests", function () {  
  after(async function () {
    await truncate();
  });

  it("should parse and save the books", function (done) {      
    async function verifyParse() {
      const firstBook = await db.Book.findOne({where: {gbId: 1}});
      const lastBook = await db.Book.findOne({where: {gbId: 999999}});

      expect(firstBook.title).to.contain("The Declaration of Independence of the United States of America");
      expect(firstBook.authors).to.have.lengthOf(1);
      expect(firstBook.authors[0]).to.be.eql("Jefferson, Thomas");
      expect(firstBook.publisher).to.be.eql("Gutenberg");
      expect(moment.utc(firstBook.publicationDate).format("YYYY-MM-DD")).to.be.eql("1971-12-01");
      expect(firstBook.language).to.be.eql("en");
      expect(firstBook.subjects).to.be.eql([
        "United States -- History -- Revolution, 1775-1783 -- Sources",
        "E201",
        "JK",
        "United States. Declaration of Independence"
      ]);
      expect(firstBook.license).to.be.eql("Public domain in the USA.");

      expect(lastBook.title).to.contain("Piccole anime");
      expect(lastBook.authors).to.have.lengthOf(1);
      expect(lastBook.authors[0]).to.be.eql("Serao, Matilde");
      expect(lastBook.publisher).to.be.eql("Gutenberg");
      expect(moment.utc(lastBook.publicationDate).format("YYYY-MM-DD")).to.be.eql("2013-03-26");
      expect(lastBook.language).to.be.eql("");
      expect(lastBook.subjects).to.be.eql([]);
      expect(lastBook.license).to.be.eql("Public domain in the USA.");

      done();
    }

    parseFiles(verifyParse);
  });
});
