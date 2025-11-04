const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve static files (css, js, images, etc.)
app.use(express.static(path.join(__dirname)));

// ✅ Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/men", (req, res) => {
  res.sendFile(path.join(__dirname, "men.html"));
});
app.get("/new-arrivals", (req, res) => {
  res.sendFile(path.join(__dirname, "new-arrivals.html"));
});
app.get("/offers", (req, res) => {
  res.sendFile(path.join(__dirname, "offers.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// ✅ Handle 404s by redirecting to home page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
