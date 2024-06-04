const http = require("node:http");
const fs = require("node:fs");

const desiredPort = process.env.PORT ?? 8081;

const processRequest = (req, res) => {
  console.log("request recieved", req.url);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Bienvenido a mi página web de inicio");
  } else if (req.url === "/contact") {
    res.statusCode = 200;
    res.end("Contactoo");
  } else if (req.url === "/image.png") {
    fs.readFile("./photo-test.png", (err, data) => {
      if (err) {
        res.statusCode === 500;
        res.end("500 Internal Server Error");
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("404 not found");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(
    `server listening on port: http://localhost:${server.address().port}`
  );
});
