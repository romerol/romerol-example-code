const { expect } = require("chai");
const { sequelize, dataTypes } = require("sequelize-test-helpers");
const Book = require("../../db/models/book")(sequelize, dataTypes);

describe("Book tests", () => {
  it("should have the right properties", () => {
    const book = new Book();

    expect(book).to.have.property("id");
    expect(book.id.type).to.be.eql(dataTypes.INTEGER);
    expect(book.id.allowNull).to.be.eql(false);
    expect(book.id.primaryKey).to.be.eql(true);
    expect(book.id.autoIncrement).to.be.eql(true);

    expect(book).to.have.property("gbId");
    expect(book.gbId.type).to.be.eql(dataTypes.INTEGER);
    expect(book.gbId.allowNull).to.be.eql(false);

    expect(book).to.have.property("title");
    expect(book.title.type).to.be.eql(dataTypes.STRING);
    expect(book.title.allowNull).to.be.eql(true);

    expect(book).to.have.property("authors");
    expect(book.authors.type).to.be.eql(dataTypes.STRING);
    expect(book.authors.allowNull).to.be.eql(true);

    expect(book).to.have.property("publisher");
    expect(book.publisher.type).to.be.eql(dataTypes.STRING);
    expect(book.publisher.allowNull).to.be.eql(true);

    expect(book).to.have.property("publicationDate");
    expect(book.publicationDate.type).to.be.eql(dataTypes.DATE);
    expect(book.publicationDate.allowNull).to.be.eql(true);

    expect(book).to.have.property("language");
    expect(book.language.type).to.be.eql(dataTypes.STRING);
    expect(book.language.allowNull).to.be.eql(true);

    expect(book).to.have.property("subjects");
    expect(book.subjects.type).to.be.eql(dataTypes.STRING);
    expect(book.subjects.allowNull).to.be.eql(true);

    expect(book).to.have.property("license");
    expect(book.license.type).to.be.eql(dataTypes.STRING);
    expect(book.license.allowNull).to.be.eql(true);
  });
});
