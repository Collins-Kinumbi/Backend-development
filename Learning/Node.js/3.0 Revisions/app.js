const fs = require("fs");
const path = require("path");

// Reading And Writting Files Syncronously
/*
const readfile = fs.readFileSync("./files/input.txt", "utf-8");

console.log(readfile);
*/

function readTxtFileSync(filePath, encoding = "utf-8") {
  try {
    const fullPath = path.join(__dirname, `${filePath}.txt`);

    const readfile = fs.readFileSync(fullPath, encoding);

    console.log(readfile);

    return readfile; // Return the file content
  } catch (err) {
    console.log("Error reading file:", err.message);
  }
}

// readTxtFileSync("/files/input");

/*
fs.writeFileSync("./files/input.txt", "Text From WriteFileSync");
 */

function writeTxtFileSync(filePath, data, encoding = "utf-8") {
  try {
    const fullPath = path.join(__dirname, `${filePath}.txt`);

    fs.writeFileSync(fullPath, data, encoding);

    console.log("File successfully written!");

    return true; // Indicate success
  } catch (err) {
    console.log("Error writing file:", err.message);
    return false; // Indicate failure
  }
}

writeTxtFileSync("/files/Written", "Hello there!");
readTxtFileSync("/files/written");
