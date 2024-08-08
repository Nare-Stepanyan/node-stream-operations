const http = require("http");
const fs = require("node:fs");
const path = require("path");

/*********************************
 
### Task 4: Implementing Basic Back Pressure

**Instructions**:

Create an HTTP server using the `http` module that streams a large file to the client upon request instead of loading it into memory all at once.

***********************************/

const port = 8080;
const fileReadPath = path.resolve(__dirname, "txt/largeTxt.txt");

http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      const readStream = fs.createReadStream(fileReadPath);

      readStream.on("error", (err) => {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Server error: ${err.message}`);
      });

      readStream.on("data", (chunk) => {
        if (!res.write(chunk)) {
          readStream.pause();
        }
      });

      res.on("drain", () => {
        readStream.resume();
      });

      readStream.on("end", () => {
        res.end();
      });

      res.on("error", (err) => {
        console.log(err);
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  })
  .listen(port, () => {
    console.log(`Listening to port: ${port}`);
  });
