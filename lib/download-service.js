const appConfig = require("../config/app-config");
const http = require("http");
const fs = require("fs");
const AdmZip = require("adm-zip");
const tar = require("tar-fs");
const path = require("path");

function onDownloaded(file, tmpFile) {
  return (response) => {
    response.pipe(file);
    file.on("finish", function() {
      console.log("downloaded");
      file.close(function () {
        const zip = new AdmZip(tmpFile);
        zip.extractAllTo("rdf-files");
        
        console.log("zip extracted");
        
        const tarFile = path.join(__dirname, '../rdf-files') + '/rdf-files.tar';        
        const destination = path.join(__dirname, '../rdf-files');
        fs.createReadStream(tarFile).pipe(tar.extract(destination));
        
        console.log("tar extracted");        
        
        fs.unlinkSync(tarFile);
        fs.unlinkSync(tmpFile);
        
        console.log("tmp files deleted");
      });
    });
  };
}

function onError(tmpFile) {
  return (err) => { 
    fs.unlinkSync(tmpFile);
    console.log("ERROR: ", err);
  };
}

function downloadFiles() {
  if (!fs.existsSync(appConfig.tmpFolder)){
    fs.mkdirSync(appConfig.tmpFolder);
  }

  const tmpFile = appConfig.tmpFolder + "/tmp.zip" 
  const file = fs.createWriteStream(tmpFile);
  
  console.log("Downloading...");
  
  http.get(appConfig.downloadURL, onDownloaded(file, tmpFile))
    .on("error", onError(tmpFile));    
}

downloadFiles();