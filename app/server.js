const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Point to public folder correctly (one level up from /app)
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Main pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
app.get("/men", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "men.html"));
});
app.get("/new-arrivals", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "new-arrivals.html"));
});
app.get("/offers", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "offers.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "contact.html"));
});

// ✅ Fallback (for 404s or wrong routes)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
