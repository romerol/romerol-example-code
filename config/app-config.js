function getFilesPath(env) {
  return env.NODE_ENV === "test" ? "./test/rdf-files" : "./rdf-files";
}

module.exports = {
  filesPath: getFilesPath(process.env),
  tmpFolder: "./tmp",
  downloadURL: "http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip",
  getFilesPath
};

