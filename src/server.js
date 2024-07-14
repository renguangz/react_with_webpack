const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../webpack.config.js");

const app = express();
const port = 4200;
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
);

app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  console.log("Request received for:", req.url);
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
