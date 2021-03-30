import app from "./app";
import https from "https";
import fs from "fs";

const PORT = process.env.PORT || 3000;

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
