const rdfParser = require("./lib/rdf-parser");
const nodeDir = require("node-dir");
const appConfig = require("./config/app-config");
const path = require("path");
const savedBooks = [];

async function onEachFile(err, data, next) {
  if (err) {
    console.log("ERROR reading file: ", err);
    throw err;
  }

  try {
    const book = await rdfParser.parseFile(data);
    savedBooks.push(book);
    next();
  } catch(e) {
    console.log("ERROR parsing file", e);
    throw e;
  }
} 

function onFinish(cb) {
  return (err, files) => {
    if (err) {
      console.log("ERROR on finish: ", err);
      throw err;
    }
  
    console.log(`Finished parsing ${files.length} files`);
    if (savedBooks.length === files.length) {
      console.log("All the files were processed!")
    } else {
      console.log("Some files were not processed correctly!")
    }

    cb();
  }
}

module.exports = function _parseFiles_(cb) {
  console.log("Processing...");

  const options = {
    match: /\.rdf$/,
    exclude: ["pgNaN.rdf"]
  };
  const filesPath = path.join(__dirname, appConfig.filesPath);

  nodeDir.readFiles(filesPath, options, onEachFile, onFinish(cb));
};