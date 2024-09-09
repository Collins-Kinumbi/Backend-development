const fs = require("fs");

// Reading And Writting Files Syncronously
/*
const readfile = fs.readFileSync("./files/input.txt", "utf-8");

console.log(readfile);
*/

function readTxtfileSync(path, encoding = "utf-8") {
  try {
    const readfile = fs.readFileSync(`${__dirname}/${path}.txt`, encoding);
    console.log(readfile);
    return readfile;
  } catch (err) {
    console.log("File Not Found!");
  }
}

// readTxtfileSync("/files/input");

/*
fs.writeFileSync("./files/input.txt", "Text From WriteFileSync");
 */

function writeTxtFileSync(path, data, encoding = "utf-8") {
  try {
    fs.writeFileSync(`${__dirname}/${path}.txt`, data, encoding);
    console.log("File Written!");
  } catch (err) {
    console.log(err.message);
  }
}

writeTxtFileSync("/files/Written", "Hello there!");
readTxtfileSync("/files/written");
