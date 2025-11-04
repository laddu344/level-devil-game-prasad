const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// 🧭 Compute full path safely
const publicPath = path.join(__dirname, "../level-devil-game/public");

console.log("🗂️ Serving static files from:", publicPath);

// ✅ Serve static files
app.use(express.static(publicPath));

// ✅ Routes
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

// ✅ Fallback for unknown routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
