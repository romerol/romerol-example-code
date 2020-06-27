const cheerio = require("cheerio");

function getBook($) {
  const book = {};

  book.id = parseInt($("pgterms\\:ebook").attr("rdf:about").replace("ebooks/", ""), 10);
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

function parseFile(data) {
  try {
    const $ = cheerio.load(data);
    const book = getBook($);

    return book;    
  } catch (e) {
    console.log("ERROR: ", e);
  }
}

module.exports = {
  parseFile
}



