const fs = require("node:fs");
const path = require("path");
const { Transform } = require("stream");

/*********************************
 
### Task 2: Transform Streams 

**Instructions**:

Create a Node.js script that uses a transform stream to handle JSON objects, 
modifying each one by adding a new property timestamp and converting it back 
into a string before writing it to an output file.

***********************************/

const fileReadPath = path.resolve(__dirname, "data.json");
const fileWritePath = path.resolve(__dirname, "transformedData.json");

const addTimestamp = (data) => {
  return data.map((obj) => ({
    ...obj,
    timestamp: new Date().toISOString(),
  }));
};

const addTimestampWithTransformStream = () => {
  const readStream = fs.createReadStream(fileReadPath, { encoding: "utf-8" });
  const writeStream = fs.createWriteStream(fileWritePath);

  const transformData = new Transform({
    transform(chunk, encoding, callback) {
      let jsonData;
      try {
        jsonData = JSON.parse(chunk);
      } catch (error) {
        return callback(error);
      }
      const updatedData = addTimestamp(jsonData);
      const updatedJsonData = JSON.stringify(updatedData, null, 2);
      callback(null, updatedJsonData);
    },
  });

  readStream.on("error", (err) => {
    console.error(`Error reading file: ${err}`);
  });

  writeStream.on("error", (err) => {
    console.error(`Error writing file: ${err}`);
  });

  readStream.pipe(transformData).pipe(writeStream);
};

addTimestampWithTransformStream();
