// console.log("Hello from Native modules");
const fs = require("fs");

// fs.writeFile("message.txt", "Hello from Nodejs", (error) => {
//   if (error) throw error;
//   console.log("The file is saved!");
// });

fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
