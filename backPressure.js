const fs = require("node:fs");
const path = require("path");

/*********************************
 
### Task 3: Implementing Basic Back Pressure

**Instructions**:

Implement a readable and a writable stream where the writable stream deliberately writes
data slower than the readable reads it, demonstrating how back pressure is managed.

***********************************/

const fileReadPath = path.resolve(__dirname, "txt/sample.txt");
const fileWritePath = path.resolve(__dirname, "txt/back-pressure.txt");

const handleBackPressure = () => {
  const text = fs.createReadStream(fileReadPath);
  const file = fs.createWriteStream(fileWritePath);

  // The drain event of the writable stream resumes the readable stream when the buffer is drained.
  file.on("drain", () => {
    file.resume();
  });

  text.on("data", (chunk) => {
    // if false, it indicates the buffer is full, the readable stream is paused.
    if (!file.write(chunk)) {
      text.pause();
    }
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

handleBackPressure();
