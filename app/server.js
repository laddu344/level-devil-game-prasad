const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Corrected static folder path
app.use(express.static(path.join(__dirname, "../level-devil-game/public")));

// ✅ Routes for each page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../level-devil-game/public", "index.html"));
});
app.get("/men", (req, res) => {
  res.sendFile(path.join(__dirname, "../level-devil-game/public", "men.html"));
});
app.get("/new-arrivals", (req, res) => {
  res.sendFile(path.join(__dirname, "../level-devil-game/public", "new-arrivals.html"));
});
app.get("/offers", (req, res) => {
  res.sendFile(path.join(__dirname, "../level-devil-game/public", "offers.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../level-devil-game/public", "contact.html"));
});

// Default fallback for 404 routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../level-devil-game/public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
