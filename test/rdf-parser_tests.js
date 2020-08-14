const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const rdfParser = require("../lib/rdf-parser");
const truncate = require("./fixtures/truncate");
const moment = require("moment");

describe("RDF parser tests", function () {  
  after(async function () {
    await truncate();
  });

  describe("should parse the first real file", function () {
    let file = null;

    before(function () {
      file = fs.readFileSync(path.join(__dirname, './rdf-files') + '/pg1.rdf');    
    });
  
    it("should parse the given file", async function () {
      const book = await rdfParser.parseFile(file);
      expect(book.gbId).to.be.eql(1);
      expect(book.title).to.contain("The Declaration of Independence of the United States of America");
      expect(book.authors).to.have.lengthOf(1);
      expect(book.authors[0]).to.be.eql("Jefferson, Thomas");
      expect(book.publisher).to.be.eql("Gutenberg");
      expect(moment.utc(book.publicationDate).format("YYYY-MM-DD")).to.be.eql("1971-12-01");
      expect(book.language).to.be.eql("en");
      expect(book.subjects).to.be.eql([
        "United States -- History -- Revolution, 1775-1783 -- Sources",
        "E201",
        "JK",
        "United States. Declaration of Independence"
      ]);
      expect(book.license).to.be.eql("Public domain in the USA.");
    });
  });

  describe("should parse the last real file", function () {
    let file = null;

    before(function () {
      file = fs.readFileSync(path.join(__dirname, './rdf-files') + '/pg999999.rdf');    
    });
  
    it("should parse the given file", async function () {
      const book = await rdfParser.parseFile(file);
      expect(book.gbId).to.be.eql(999999);
      expect(book.title).to.contain("Piccole anime");
      expect(book.authors).to.have.lengthOf(1);
      expect(book.authors[0]).to.be.eql("Serao, Matilde");
      expect(book.publisher).to.be.eql("Gutenberg");
      expect(moment.utc(book.publicationDate).format("YYYY-MM-DD")).to.be.eql("2013-03-26");
      expect(book.language).to.be.eql("");
      expect(book.subjects).to.be.eql([]);
      expect(book.license).to.be.eql("Public domain in the USA.");
    });
  });
  
  describe("should throw an error because it is unable to save a NaN in the gbId column", function () {
    let file = null;

    before(function () {
      file = fs.readFileSync(path.join(__dirname, './rdf-files') + '/pgNaN.rdf');    
    });
  
    it("should throw an error", async function () {
      try {
        await rdfParser.parseFile(file);
      } catch (e) {
        expect(e.message).to.be.eql("invalid input syntax for type integer: \"NaN\"");
      }
    });
  });  
});
