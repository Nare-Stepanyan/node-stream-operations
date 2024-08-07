# node-stream-operations

### Task 1: Basic Stream Operations

**Instructions**:

Write a simple Node.js script using the `fs` module to read a text file and write it to another text file using streams.(Do this with and without pipes)


### Task 2: Transform Streams 

**Instructions**:

Create a Node.js script that uses a transform stream to handle JSON objects, modifying each one by adding a new property timestamp and converting it back into a string before writing it to an output file.


### Task 3: Implementing Basic Back Pressure

**Instructions**:

Implement a readable and a writable stream where the writable stream deliberately writes data slower than the readable reads it, demonstrating how back pressure is managed.


### Task 4: HTTP Streaming

**Instructions**:

Create an HTTP server using the `http` module that streams a large file to the client upon request instead of loading it into memory all at once.


### Task 5: Real-time Data Processing(Optional)

**Instructions**:

Create a small application using `socket.io` that streams real-time data between a server and client, showcasing the use of duplex streams.
(For frontend use simple HTML file, to import socket use <script src="/socket.io/socket.io.js"></script>)
