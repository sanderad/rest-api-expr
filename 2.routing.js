const http = require("node:http");
const ditto = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(ditto));
        default:
          return res.end("404");
      }
    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const data = JSON.parse(body);
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(data));
          });

          break;
        }
        default:
          return res.end("404");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(3001, () => {
  console.log(
    `server listening on port: http://localhost:${server.address().port}`
  );
});
