function getFilesPath(env) {
  return env.NODE_ENV === "test" ? "./test/rdf-files" : "./rdf-files";
}

module.exports = {
  filesPath: getFilesPath(process.env),
  getFilesPath
};

