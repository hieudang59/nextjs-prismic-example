const express = require("express");
const dev = process.env.NODE_ENV !== "production";
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Here we are handling our custom route, this now work for server side rendering
    server.get("/blog/:slug", (req, res) => {
      const nextJsPage = "/blogPost";
      const queryParams = { slug: req.params.slug };
      app.render(req, res, nextJsPage, queryParams);
    });

    server.get("*", (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready http://localhost:3000 <");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
