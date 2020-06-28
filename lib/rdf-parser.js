const cheerio = require("cheerio");
const db = require("../db/models");

function getBook($) {
  const book = {};

  book.gbId = parseInt($("pgterms\\:ebook").attr("rdf:about").replace("ebooks/", ""), 10);
  book.title = $("dcterms\\:title").text();
  book.authors = $("pgterms\\:agent pgterms\\:name").toArray().map((elem) => {
    return $(elem).text();
  });
  book.publisher = "Gutenberg";
  book.publicationDate = $("dcterms\\:issued").text();
  book.language = $("dcterms\\:language rdf\\:value").text();
  book.subjects = $("dcterms\\:subject rdf\\:value").toArray().map((elem) => {
    return $(elem).text();
  });
  book.license = $("dcterms\\:rights").text();

  return book;      
}

async function parseFile(data) {
  try {
    const $ = cheerio.load(data);
    const bookData = getBook($);
    const book = await db.Book.create(bookData);

    return book;    
  } catch (e) {
    console.log("ERROR: ", e);
    throw e;
  }
}

module.exports = {
  parseFile
}



