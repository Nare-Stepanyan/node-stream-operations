const fs = require("node:fs");
const path = require("path");

/*********************************
 
### Task 1: Permissions and Metadata

**Instructions**:

Write a simple Node.js script using the `fs` module to read a text file and write it to another text file using streams.(Do this with and without pipes)

***********************************/

const fileReadPath = path.resolve(__dirname, "txt/sample.txt");
const fileWritePath = path.resolve(__dirname, "txt/copy.txt");

// Read and write without pipes
const readAndWriteTextWithStream = () => {
  const text = fs.createReadStream(fileReadPath);
  const file = fs.createWriteStream(fileWritePath);

  text.on("data", (chunk) => {
    file.write(chunk);
  });
  text.on("end", () => {
    file.end();
  });
  text.on("error", (err) => {
    console.log(`Error occurred while reading:, ${err}`);
  });
  file.on("error", (err) => {
    console.log(`Error occurred while writing:, ${err}`);
  });
};

readAndWriteTextWithStream();

// Read and write with pipes

const readAndWriteStreamWithPipes = () => {
  const text = fs.createReadStream(fileReadPath);
  const file = fs.createWriteStream(fileWritePath);
  text.pipe(file);
  text.on("error", (err) => {
    console.log(`Error occurred while reading:, ${err}`);
  });
  file.on("error", (err) => {
    console.log(`Error occurred while writing:, ${err}`);
  });
};

readAndWriteStreamWithPipes();
