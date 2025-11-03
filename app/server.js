// app/server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// __dirname is app/ when this file is app/server.js
const publicPath = path.join(__dirname, "public");

// Serve static files from app/public
app.use(express.static(publicPath));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.get("/men", (req, res) => {
  res.sendFile(path.join(publicPath, "men.html"));
});
app.get("/new-arrivals", (req, res) => {
  res.sendFile(path.join(publicPath, "new-arrivals.html"));
});
app.get("/offers", (req, res) => {
  res.sendFile(path.join(publicPath, "offers.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(publicPath, "contact.html"));
});

// Fallback 404 -> show index (or create a 404 page)
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicPath, "index.html"));
});

// Bind to 0.0.0.0 so Kubernetes / Docker can reach it
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started at http://0.0.0.0:${PORT}`);
});
